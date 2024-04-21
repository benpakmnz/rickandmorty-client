import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      xs={12}
      sx={{
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        height: "150px",
      }}
    >
      <Typography variant="h2">{title}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Go back
      </Button>
    </Grid>
  );
};

export default NotFound;
