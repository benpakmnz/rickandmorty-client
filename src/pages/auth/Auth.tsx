import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { login, signup } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import useMediaQueryScreen from "../../hooks/useMediaQuery";
import { IUserAuthParams } from "../../utils/interfaces";
import Loader from "../../components/loader/Loader";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = useMemo(
    () => location.pathname === "/signup",
    [location.pathname]
  );

  const { isSmallScreen } = useMediaQueryScreen();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formData, setFormData] = useState<IUserAuthParams>({
    email: "",
    password: "",
    name: "",
    isAdmin: false,
  });

  useEffect(() => {
    const isFormInvalid = () => {
      if (isSignup) {
        return Object.values(formData).some((value) => value === "");
      } else {
        return formData.email === "" || formData.password === "";
      }
    };

    setIsButtonDisabled(isFormInvalid());
  }, [formData, isSignup]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string | boolean = e.target.value;
    const name = e.target.name;
    if (name === "isAdmin") {
      value = e.target.checked;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: value ? "" : `Please enter ${name}.`,
    }));
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: isSignup ? signup : login,
    onSuccess: (data) => {
      if (data) {
        navigate("/");
      }
    },
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <Card
      className={styles.authContainer}
      variant="outlined"
      sx={{ width: isSmallScreen ? "80vw" : "50vw" }}
    >
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
            <>
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
              <Grid item xs={12}>
                <FormControlLabel
                  label="is admin"
                  control={
                    <Checkbox
                      name="isAdmin"
                      checked={formData.isAdmin}
                      onChange={handleChange}
                    />
                  }
                />
              </Grid>
              {formData.isAdmin && (
                <Grid item xs={12}>
                  <Typography variant="body1">
                    As an admin, you'll gain access to an extensive range of
                    locations and the opportunity to seamlessly integrate
                    locations into our expansive database."
                  </Typography>
                </Grid>
              )}
            </>
          )}
          <Grid item xs={12}>
            {isError && (
              <Typography variant="body2" color="error">
                {error.message || "An error occurred."}
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
      {isPending && <Loader />}
    </Card>
  );
};

export default Auth;
