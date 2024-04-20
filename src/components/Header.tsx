import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { queryClient } from "../main";
import { IUserParams } from "../utils/Interfaces/auth-interface";

const Header: React.FC = () => {
  const loggedUser: IUserParams | undefined = queryClient.getQueryData([
    "user",
  ]);

  return (
    <header>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        p={5}
        sx={{ background: "white" }}
      >
        <Grid item sm={8}>
          <Typography
            component="h1"
            variant="h2"
            fontWeight="bold"
            sx={{ fontSize: 60 }}
          >
            The Rick and
            <br /> Morty Locations
          </Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{loggedUser?.name}</Typography>
          <Avatar />
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
