import { Avatar, Card, CardActionArea, Grid, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import styles from "./locationItem.module.scss";
import { useNavigate } from "react-router-dom";

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
    <Grid item xs={12} sm={6} md={4} lg={3} className={styles.container} p={2}>
      <Card variant="outlined">
        <CardActionArea onClick={() => navigate(`/${location.id}`)}>
          <Avatar className={styles.avatar} />
          <Typography variant="h5">{location.name}</Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default LocationItem;
