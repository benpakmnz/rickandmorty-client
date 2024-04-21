import { Avatar, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { getNameInitial } from "../../utils/helpers";

export interface ILocationAttr {
  name: string;
  icon?: ReactElement;
  id: number;
  type: string;
  dimension: string;
  residents: string[];
  isExternal?: boolean;
}

const LocationItem: React.FC<{ location: ILocationAttr }> = ({ location }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/${location.id}`)}
    >
      <Avatar className={styles.avatarContainer}>
        {getNameInitial(location.name)}
      </Avatar>
      <Typography variant="h6">{location.name}</Typography>
    </div>
  );
};

export default LocationItem;
