"use client";
//import styles from "../page.module.css";
import styles from "./facility.module.css";
import "../page.module.css";
import React, { useEffect } from "react";
import { UserAuth } from "../../context/store";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

import { withProtected } from "../../hooks/route";

import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Facility() {
  const { user, signin, signup, logout } = UserAuth();
  const [imageFile, setImageFile] = React.useState<File>();
  const [facility, setFacility] = React.useState({
    name: "", //מק''ט המתקן
    sku: "", //מס''ד המתקן
    imageUrl: "",
  });

  // first approach to get data by demand
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "facilities"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
      });
    };
    fetchData();
  }, []);

  // second approach to get data on snapshot change
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "facilities"), (snapshot) => {
      const newData: any[] = [];
      snapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      console.log("newData: ", newData);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleFieldChange = (e: any) => {
    setFacility((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectedFiles = (files: any) => {
    if (files && files[0]) {
      setImageFile(files[0]);
      console.log("Image file: ", imageFile);
    } else {
      alert("File is too big");
    }
  };

  const handleUploadFile = () => {
    console.log("Upload is running");
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
            console.log("File available at", downloadURL);
          });
        }
      );
    } else {
      alert("No file to upload");
    }
  };
  const functions = getFunctions();
  const createFacility = httpsCallable(functions, "createFacility");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submit data ", { ...facility });

    createFacility({
      name: facility.name,
      sku: facility.sku,
      imageUrl: facility.imageUrl,
    })
      .then(() => {
        console.log("Facility created");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <>
      <div className={styles.root}>Facility | Welcome, {user.email}!</div>

      <div className={styles.add}>
        <div className={styles.createUserContainer}>
          <div className={styles.register}>
            <form onSubmit={handleSubmit}>
              <div className={styles.create}>
                <h1>Create new Facility </h1>

                <label htmlFor="">Facility name</label>
                <input
                  required
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={handleFieldChange}
                />
                <label htmlFor="">SKU</label>
                <input
                  type="text"
                  required
                  placeholder="sku"
                  name="sku"
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Password</label>
                <input
                  type="file"
                  accept="image/png"
                  required
                  placeholder="select file to upload"
                  name="imageUrl"
                  onChange={(files) => {
                    handleSelectedFiles(files.target.files);
                  }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUploadFile}
                >
                  Upload file
                </Button>

                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtected(Facility);
