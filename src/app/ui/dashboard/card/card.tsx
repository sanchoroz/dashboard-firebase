"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/store";
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";

const Card = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Title</span>
        <span className={styles.number}>Number</span>
        <span className={styles.detail}>previous week</span>
      </div>
    </div>
  );
};

export default Card;
