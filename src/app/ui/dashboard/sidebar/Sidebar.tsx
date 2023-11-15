"use client";

import { style } from "@mui/system";
import Image from "next/image";
import React from "react";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdPeople,
  MdOutlineSettings,
  MdLogout,
  MdBroadcastOnHome,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import { UserAuth } from "@/app/context/store";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Facilities",
        path: "/dashboard/facility",
        icon: <MdBroadcastOnHome />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  const { user, signin, signup, logout } = UserAuth();

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/author-image.png"
          alt="User image"
          width={50}
          height={50}
        />
        <div className={styles.userDetails}>
          <span className={styles.username}>Alex Roz</span>
          <span className={styles.userTitle}>Administrator</span>
          <span className={styles.userTitle}>{user.email}</span>
        </div>
      </div>

      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink
                title={item.title}
                path={item.path}
                icon={item.icon}
                key={item.title}
              />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout} onClick={logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
