import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { queryClient } from "../../main";
import useMediaQueryScreen from "../../hooks/useMediaQuery";
import styles from "./styles.module.scss";
import icon from "../../assets/rickandmortyicon.svg";
import { IUserParams } from "../../utils/interfaces";

const Header: React.FC = () => {
  const { isSmallScreen } = useMediaQueryScreen();
  const loggedUser: IUserParams | undefined = queryClient.getQueryData([
    "user",
  ]);

  return (
    <Grid component={"header"} container>
      <Grid
        item
        sm={8}
        className={styles.logo}
        sx={
          isSmallScreen
            ? { flexDirection: "column", alignItems: "flex-start" }
            : { alignItems: "center" }
        }
      >
        <img src={icon} />
        <Typography
          className={styles.appTitle}
          component="h1"
          variant="h2"
          sx={{
            fontSize: isSmallScreen ? 30 : 60,
            fontWeight: "bold",
          }}
        >
          The Rick and Morty <br /> Locations
        </Typography>
      </Grid>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <Typography mr={2} variant="body1">
          Hi {loggedUser?.name}
        </Typography>
        <Avatar
          sx={
            isSmallScreen
              ? { width: 30, height: 30 }
              : { width: 50, height: 50 }
          }
        />
      </Grid>
    </Grid>
  );
};

export default Header;
