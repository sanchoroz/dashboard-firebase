"use client";

import React, { useEffect, useState } from "react";
import styles from "./pagination.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";

const Pagination = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button} disabled>
        Previous
      </button>
      <button className={styles.button}>Next</button>
    </div>
  );
};

export default Pagination;
