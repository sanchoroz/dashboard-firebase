"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/store";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { user, signin, signup, logout } = UserAuth();

  return (
    <div className={styles.wrapper}>
      {!user ? (
        <div className={styles.main}>
          <ul className={styles.nav}>
            <li>
              <Link href={`/`}>Home</Link>
            </li>
          </ul>
          <ul className={styles.login}>
            <li>User not logged in</li>
            <li>
              <Link href={`/login`}>Login</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.main}>
          <ul className={styles.nav}>
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
            <li>
              <Link href={`/dashboard/profile`}>Profile</Link>
            </li>
            <li>
              <Link href={`/dashboard/facility`}>Facility</Link>
            </li>
          </ul>
          <ul className={styles.login}>
            <li>Welcome {user.email}</li>
            <li onClick={logout}>Sign out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
