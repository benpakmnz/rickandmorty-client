import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Grid,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { login, signup } from "../../services/apiAuth";
import { IUserAuthParams } from "../../utils/Interfaces/auth-interface";
import { useMutation } from "@tanstack/react-query";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = useMemo(
    () => location.pathname === "/signup",
    [location.pathname]
  );
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formData, setFormData] = useState<IUserAuthParams>({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsButtonDisabled(isFormInvalid());
    setServerError(null);
  }, [formData, isSignup]);

  const isFormInvalid = () => {
    if (isSignup) {
      return Object.values(formData).some((value) => value === "");
    } else {
      return formData.email === "" || formData.password === "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: value ? "" : `Please enter ${name}.`,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => (isSignup ? signup(formData) : login(formData)),
    onSuccess: (data) => {
      if (data) {
        navigate("/");
      }
    },
    onError: (error) => {
      setServerError(error.message || "An error occurred.");
    },
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <Card className={styles.authContainer} variant="outlined">
      <Typography component="h1" variant={isSmallScreen ? "h4" : "h2"}>
        The Rick and Morty Locations
      </Typography>
      <Typography component="h2" variant="h5" mb={2}>
        {isSignup ? "Signup" : "Login"}:
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              type="email"
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              required
              value={formData.password}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          {isSignup && (
            <Grid item xs={12}>
              <TextField
                type="name"
                name="name"
                required
                label="Name"
                variant="outlined"
                value={formData.name}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            {serverError && (
              <Typography variant="body2" color="error">
                {serverError}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className={styles.actionsContainer}>
            <Tooltip
              title={
                Object.keys(formErrors).length > 0
                  ? "Please fill in all required fields"
                  : ""
              }
            >
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isButtonDisabled}
                >
                  {isSignup ? "sign up" : "login"}
                </Button>
              </span>
            </Tooltip>

            <Button
              type="button"
              variant="text"
              color="primary"
              onClick={() => navigate(isSignup ? "/login" : "/signup")}
            >
              switch to {isSignup ? "login" : "sign up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Auth;
