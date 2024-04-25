import React from "react";
import { Avatar, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  addLocation,
  getCharecters,
  getLocation,
} from "../../services/apiLocation";
import ResidentItem from "../../components/residentItem/ResidentItem";
import { queryClient } from "../../main";
import { getNameInitial } from "../../utils/helpers";
import styles from "./styles.module.scss";
import Loader from "../../components/loader/Loader";
import useMediaQueryScreen from "../../hooks/useMediaQuery";
import {
  ILocationParams,
  IResidentParams,
  IUserParams,
} from "../../utils/interfaces";
import NotFound from "../../components/notFound/NotFound";

const LocationInfo: React.FC = () => {
  const { id } = useParams();
  const { isSmallScreen } = useMediaQueryScreen();
  const loggedUser: IUserParams | undefined = queryClient.getQueryData([
    "user",
  ]);

  const {
    isLoading,
    data: locationItem,
    refetch: refetchLocation,
  } = useQuery<ILocationParams | null>({
    queryKey: ["location", `${id}`],
    queryFn: () => (id ? getLocation(id) : null),
    staleTime: 60000,
  });

  const { isLoading: isLoadingAnotherResource, data: residentsList } = useQuery<
    IResidentParams[] | null
  >({
    queryKey: ["residents", id],
    queryFn: () =>
      locationItem?.residents ? getCharecters(locationItem.residents) : null,
    enabled: !!locationItem,
  });

  const handleAddLocation = async () => {
    locationItem && (await addLocation(locationItem));
    refetchLocation();
  };

  if (isLoading || isLoadingAnotherResource) return <Loader />;
  return (
    <Grid
      container
      columnSpacing={6}
      justifyContent="center"
      alignItems="flex-start"
      padding={5}
    >
      {locationItem ? (
        <>
          <Grid item xs={10} lg={3}>
            {!isSmallScreen && (
              <Avatar className={styles.avatarContainer}>
                {getNameInitial(locationItem?.name)}
              </Avatar>
            )}
            <Typography
              variant={isSmallScreen ? "h5" : "h3"}
              mt={isSmallScreen ? 3 : 0}
            >
              {locationItem?.name}
            </Typography>
            <Typography variant="h6">Type: {locationItem?.type}</Typography>
            <Typography variant="h6" mb={2}>
              Dimension:{locationItem?.dimension}
            </Typography>
            {loggedUser?.isAdmin && locationItem?.isExternal && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddLocation}
              >
                Add this Location
              </Button>
            )}
            {loggedUser?.isAdmin && !locationItem?.isExternal && (
              <Chip
                label="This location is in our Data base"
                variant="outlined"
                color="secondary"
              />
            )}
          </Grid>
          <Grid item xs={10} lg={8}>
            <Grid
              container
              rowSpacing={isSmallScreen ? 3 : 5}
              sx={{ margin: isSmallScreen ? "auto" : "" }}
            >
              <Grid item xs={12}>
                {isSmallScreen && <Divider />}
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  component="h3"
                >
                  Residents ({residentsList?.length || 0})
                </Typography>
              </Grid>
              {residentsList?.map((resident) => (
                <Grid item xs={12} lg={3} key={resident.id}>
                  <ResidentItem resident={resident} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <NotFound title="Location Not found..." />
      )}
    </Grid>
  );
};

export default LocationInfo;
