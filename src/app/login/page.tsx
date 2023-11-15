"use client";

import React from "react";
import Login from "../ui/login/Login";
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
