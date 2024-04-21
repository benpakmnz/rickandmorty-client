import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { IResidentParams } from "../../utils/interfaces";

const ResidentItem: React.FC<{ resident: IResidentParams }> = ({
  resident,
}) => {
  return (
    <Grid container spacing={2} className={styles.residentContainter}>
      <Grid item xs={4}>
        <Avatar src={resident.image} className={styles.avatarContainer} />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h6">{resident.name}</Typography>
        <Typography variant="body2"> Status:{resident.status}</Typography>
        <Typography variant="body2">Species: {resident.species}</Typography>
        <Typography variant="body2">Gender:{resident.gender}</Typography>
      </Grid>
    </Grid>
  );
};

export default ResidentItem;
