"use client";

import React, { useEffect } from "react";
import { UserAuth } from "../../../context/store";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { storage } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { withProtected } from "../../../hooks/route";

import styles from "../../../ui/dashboard/facilities/add/addFacility.module.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";

function AddFacility() {
  const { user, signin, signup, logout } = UserAuth();
  const [imageFile, setImageFile] = React.useState<File>();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progressUpload, setProgressUpload] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [downloadUrl, setDownloadUrl] = React.useState(false);

  const [facility, setFacility] = React.useState({
    name: "",
    category: "",
    sku: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((doc) => {
        if (doc.id) {
          setCategories(doc.data().list);
        }
      });
    };
    fetchData();
    console.log(categories);
  }, []);

  const functions = getFunctions();
  const createFacility = httpsCallable(functions, "createFacility");

  const handleFieldChange = (e: any) => {
    setFacility((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleDropdownChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleSelectedFiles = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
      console.log("Image file: ", imageFile);
    } else {
      alert("File is too big");
    }
  };

  const handleUploadFile = () => {
    setIsUploading(true);

    if (imageFile) {
      const storageRef = ref(storage, `image/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      console.log("Upload is running");
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressUpload(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFacility({ ...facility, imageUrl: downloadURL });
            setIsUploading(false);
            setDownloadUrl(true);
            console.log("File available at", downloadURL);
          });
        }
      );
    } else {
      alert("No file to upload");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submit data ", { ...facility });

    createFacility({
      name: facility.name,
      category: selectedCategory,
      sku: facility.sku,
      imageUrl: facility.imageUrl,
    })
      .then(() => {
        console.log("Facility created");
        setFacility({
          name: "",
          sku: "",
          category: "",
          imageUrl: "",
        });
        setSelectedCategory("");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.left}>
          <select
            name="cat"
            id="cat"
            required
            value={selectedCategory}
            onChange={handleDropdownChange}
          >
            {categories &&
              categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="facilty name"
            name="name"
            required
            value={facility.name}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder="facility sku"
            name="sku"
            value={facility.sku}
            required
            onChange={handleFieldChange}
          />
          <Tooltip title="Add details and upload image">
            <span>
              <Button type="submit" disabled={!downloadUrl ? true : false}>
                Submit
              </Button>
            </span>
          </Tooltip>
        </div>
        <div className={styles.right}>
          <input
            type="file"
            accept="image"
            required
            placeholder="select file to upload"
            name="imageUrl"
            onChange={(files) => {
              handleSelectedFiles(files.target.files);
            }}
          />
          <Box sx={{ width: "100%", margin: "10px 0" }}>
            <LinearProgress variant="determinate" value={progressUpload} />
          </Box>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadFile}
          >
            Upload file
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withProtected(AddFacility);
