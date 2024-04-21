import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  addLocation,
  getCharecters,
  getLocation,
} from "../../services/apiLocation";
import { ILocationAttr } from "../../components/locationItem/LocationItem";
import ResidentItem, {
  IResidentAttr,
} from "../../components/residentItem/ResidentItem";

const LocationInfo: React.FC = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: locationItem,
    refetch: refetchLocation,
  } = useQuery<ILocationAttr | null>({
    queryKey: ["location"],
    queryFn: () => (id ? getLocation(id) : null),
    staleTime: 0,
  });

  const {
    isLoading: isLoadingAnotherResource,
    data: residentsList,
    refetch: refetchResidents,
  } = useQuery<IResidentAttr[] | null>({
    queryKey: ["residents"],
    queryFn: () =>
      locationItem?.residents ? getCharecters(locationItem.residents) : null,
    enabled: !!locationItem,
    staleTime: 0,
  });

  useEffect(() => {
    if (locationItem) {
      refetchResidents();
    }
  }, [locationItem, refetchResidents]);

  const handleAddLocation = async () => {
    locationItem && (await addLocation(locationItem));
    refetchLocation();
  };

  useEffect(() => {
    if (id) {
      refetchLocation();
    }
  }, [id, refetchLocation]);

  if (isLoading || isLoadingAnotherResource) return <h1>loading.....</h1>;
  if (!locationItem) return <h1>loaction not found</h1>;
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} lg={3}>
        <Avatar />
        <Typography variant="h5">{locationItem?.name}</Typography>
        <Typography variant="body2">Type: {locationItem?.type}</Typography>
        <Typography variant="body2">
          Dimension:{locationItem?.dimension}
        </Typography>
        {locationItem?.isExternal ? (
          <Button variant="contained" onClick={handleAddLocation}>
            Add this Location
          </Button>
        ) : (
          <>
            <Divider />
            <Typography>This location is in our Data base</Typography>
          </>
        )}
      </Grid>
      <Grid item xs={12} lg={7}>
        <Grid container spacing={5} sx={{ margin: "auto" }}>
          <Grid item xs={12}>
            <Typography>Residents ({residentsList?.length || 0})</Typography>
          </Grid>
          {residentsList?.map((resident) => (
            <Grid item xs={4} key={resident.id}>
              <ResidentItem resident={resident} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LocationInfo;
