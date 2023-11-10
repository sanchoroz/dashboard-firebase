"use client";
import styles from "./page.module.css";
import React from "react";
import { UserAuth } from "../context/store";
import { withProtected } from "../hooks/route";

function Dashboard() {
  const { user, signin, signup, logout } = UserAuth();

  return (
    <>
      <div className={styles.root}>Dashboard | Welcome, {user.email}!</div>
    </>
  );
}

export default withProtected(Dashboard);
