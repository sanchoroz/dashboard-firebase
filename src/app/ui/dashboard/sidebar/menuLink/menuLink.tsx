"use client";

import { style } from "@mui/system";
import React from "react";
import styles from "./menulink.module.css";
import { light } from "@mui/material/styles/createPalette";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProp {
  title: string;
  path: string;
  icon: React.JSX.Element;
}

const MenuLink: React.FC<MenuItemProp> = (props) => {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <Link
      href={props.path}
      className={`${styles.container} ${
        pathName === props.path && styles.active
      }`}
    >
      {props.icon}
      {props.title}
    </Link>
  );
};

export default MenuLink;
