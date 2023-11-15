"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/store";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./login.module.css";

const Login = () => {
  const { user, signin, signup, logout } = UserAuth();
  const [loading, setLoading] = useState(true);

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function submitHandle() {
    if (!credentials.email || !credentials.password) {
      setError("Please set username and password");
      return;
    }
    try {
      await signin(credentials.email, credentials.password);
    } catch (err) {
      setError("Wrond username or password");
      console.error("Login error: ", err);
    }
  }

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserCredentialsChange = (e: any) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
      console.log("User info: ", user);
    };
    checkAuthentication();
  }, [user]);

  return (
    <Paper className={styles.root}>
      <Typography data-cy="login-title" className={styles.title} variant="h5">
        Login:
      </Typography>
      {error && (
        <div>
          <h1 className={styles.errorMessage}>{error}</h1>
        </div>
      )}
      <form>
        <TextField
          className={styles.field}
          data-cy="name-input"
          label="email"
          fullWidth
          name="email"
          onChange={handleUserCredentialsChange}
        />
        <TextField
          className={styles.field}
          data-cy="password-input"
          label="password"
          name="password"
          fullWidth
          onChange={handleUserCredentialsChange}
        />
        <Button
          data-cy="login-button"
          size="large"
          variant="contained"
          fullWidth
          onClick={submitHandle}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
