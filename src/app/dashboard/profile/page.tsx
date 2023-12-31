"use client";

import React from "react";
import { UserAuth } from "../../context/store";
import { withProtected } from "../../hooks/route";

function Profile() {
  const { user, signin, signup, logout } = UserAuth();

  return (
    <>
      <div>Profile | Welcome, {user.email}!</div>
    </>
  );
}

export default withProtected(Profile);
