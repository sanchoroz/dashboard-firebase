"use client";
import { style } from "@mui/system";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/store";
import styles from "./navbar.module.css";
import {
  MdSearch,
  MdOutlineChatBubbleOutline,
  MdNotificationsNone,
  MdPublic,
} from "react-icons/md";

const Navbar = () => {
  const { user, signin, signup, logout } = UserAuth();
  const pathName = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathName.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search" className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MdOutlineChatBubbleOutline size={20} />
          <MdNotificationsNone size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// {!user ? (
//   <div>
//     <ul>
//       <li>
//         <Link href={`/`}>Home</Link>
//       </li>
//     </ul>
//     <ul>
//       <li>User not logged in</li>
//       <li>
//         <Link href={`/login`}>Login</Link>
//       </li>
//     </ul>
//   </div>
// ) : (
//   <div>
//     <ul>
//       <li>
//         <Link href={`/`}>Home</Link>
//       </li>
//       <li>
//         <Link href={`/dashboard/profile`}>Profile</Link>
//       </li>
//       <li>
//         <Link href={`/dashboard/facility`}>Facility</Link>
//       </li>
//     </ul>
//     <ul>
//       <li>Welcome {user.email}</li>
//       <li onClick={logout}>Sign out</li>
//     </ul>
//   </div>
// )}
