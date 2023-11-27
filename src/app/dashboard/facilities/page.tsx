"use client";

import React, { useEffect } from "react";
import { UserAuth } from "../../context/store";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { withProtected } from "../../hooks/route";

import styles from "../../ui/dashboard/facilities/facilities.module.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { dividerClasses } from "@mui/material";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

function Facility() {
  const { user, signin, signup, logout } = UserAuth();

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

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search />
        <Link href="/dashboard/facilities/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>SKU</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>Squat</div>
            </td>
            <td>234234234234</td>
            <td>
              <Image
                className={styles.userImage}
                src="/author-image.png"
                alt="User image"
                width={40}
                height={40}
              />
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/facilities/add">
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export default withProtected(Facility);
