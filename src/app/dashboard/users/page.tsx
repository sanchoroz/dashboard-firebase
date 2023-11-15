"use client";

import React from "react";
import { UserAuth } from "../../context/store";
import { withProtected } from "../../hooks/route";

function Users() {
  const { user, signin, signup, logout } = UserAuth();

  return (
    <>
      <div>Users | Welcome, {user.email}!</div>
    </>
  );
}

export default withProtected(Users);
