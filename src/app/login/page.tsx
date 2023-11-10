"use client";

import React from "react";
import Login from "../components/Login/Login";
import { withPublic } from "../hooks/route";
import { UserAuth } from "../context/store";

function LoginPage() {
  const auth = UserAuth();

  return (
    <>
      <Login />
    </>
  );
}

export default withPublic(LoginPage);
