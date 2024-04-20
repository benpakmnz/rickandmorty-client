import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { login, signup } from "../../services/apiAuth";
import { IUserAuthParams } from "../../utils/Interfaces/auth-interface";
import { useMutation } from "@tanstack/react-query";

const Auth = () => {
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [formData, setFormData] = useState<IUserAuthParams>({
    email: "",
    password: "",
    name: "",
    id: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => (isSignup ? signup(formData) : login(formData)),
    onSuccess: (data) => {
      if (data) {
        navigate("/");
      }
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              size="small"
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
              size="small"
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
                size="small"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          )}

          <Grid item xs={12} className="flex-item end">
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
              endIcon={<SendIcon fontSize="small" />}
            >
              {isSignup ? "sign up" : "login"}
            </Button>

            <Button
              type="button"
              variant="text"
              size="small"
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
