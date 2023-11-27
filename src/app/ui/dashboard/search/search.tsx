"use client";

import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";

const Search = () => {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder="Search" className={styles.input} />
    </div>
  );
};

export default Search;
