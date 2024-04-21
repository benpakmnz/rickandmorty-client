import { Avatar, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { getNameInitial } from "../../utils/helpers";
import useMediaQueryScreen from "../../hooks/useMediaQuery";
import { ILocationParams } from "../../utils/interfaces";

const LocationItem: React.FC<{ location: ILocationParams }> = ({
  location,
}) => {
  const navigate = useNavigate();
  const { isSmallScreen } = useMediaQueryScreen();
  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/${location.id}`)}
    >
      <Avatar
        className={styles.avatarContainer}
        sx={{ fontSize: isSmallScreen ? "30px" : "60px" }}
      >
        {getNameInitial(location.name)}
      </Avatar>
      <Typography variant="h6">{location.name}</Typography>
    </div>
  );
};

export default LocationItem;
