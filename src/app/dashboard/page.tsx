"use client";
import React from "react";
import { UserAuth } from "../context/store";
import { withProtected } from "../hooks/route";
import Card from "../ui/dashboard/card/card";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import styles from "../ui/dashboard/dashboard.module.css";

function Dashboard() {
  const { user, signin, signup, logout } = UserAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div>Dashboard | Welcome, {user.email}!</div>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
}

export default withProtected(Dashboard);
