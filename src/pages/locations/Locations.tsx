import {
  Avatar,
  Button,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useState } from "react";
import LocationItem from "../../components/locationItem/LocationItem";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getLocations } from "../../services/apiLocation";
import {
  addLocationRequest,
  deleteLocationRequests,
  getAllLocationRequests,
} from "../../services/apiLocationRequests";
import useDebounce from "../../hooks/useDebounce";
import styles from "./styles.module.scss";
import Loader from "../../components/loader/Loader";
import { ILocationParams, IUserParams } from "../../utils/interfaces";
import { queryClient } from "../../main";

const Locations: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState("");
  const debouncedSearchValue = useDebounce(searchInput, 500);
  const loggedUser: IUserParams | undefined = queryClient.getQueryData([
    "user",
  ]);

  const { data: locationsList, isLoading } = useQuery<ILocationParams[]>({
    queryKey: ["locations", debouncedSearchValue],
    queryFn: async () => {
      const data = await getLocations(searchInput);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  const { data: requestsList, refetch: refetchRequestsList } = useQuery<
    { location: string; id: string }[]
  >({
    queryKey: ["requestsList"],
    queryFn: async () => {
      const data = await getAllLocationRequests();
      return data;
    },
    enabled: loggedUser?.isAdmin,
    staleTime: 100,
  });

  const locationsMutation = useMutation({
    mutationFn: (data: string) => addLocationRequest(data),
    onSuccess: () => {
      setSuccessMessage("Your requset has been submitted, thank you ");
      refetchRequestsList();
    },
  });

  const requestlocationsMutation = useMutation({
    mutationFn: (id: string) => deleteLocationRequests(id),
    onSuccess: () => {
      refetchRequestsList();
    },
  });

  const handleButtonClick = async () => {
    locationsMutation.mutate(searchInput);
  };

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <Grid container p={8}>
      {loggedUser?.isAdmin && (
        <Grid item xs={12} lg={2}>
          <Typography sx={{ mb: 2 }} variant="h6" component="div">
            Location Requests ({requestsList?.length || 0})
          </Typography>
          <List>
            {requestsList?.map((request) => (
              <ListItem
                divider
                key={request.id}
                sx={{ bgcolor: "background.paper" }}
              >
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary={request.location} />
                <Button
                  onClick={() => requestlocationsMutation.mutate(request.id)}
                >
                  x
                </Button>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
      <Grid item xs={12} lg={loggedUser?.isAdmin ? 10 : 12}>
        <Grid container rowSpacing={8} className={styles.locationWrapper}>
          <Grid item xs={9} lg={8} xl={6}>
            <Paper className={styles.searchbar}>
              <InputBase
                className={styles.inputBase}
                placeholder="Search for location"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target.value)
                }
              />
              <SearchIcon />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            {isLoading && <Loader />}
            <Grid
              container
              spacing={2}
              justifyContent="left"
              alignItems="center"
            >
              {locationsList && locationsList.length > 0 ? (
                locationsList?.map((location) => (
                  <Grid item xs={6} lg={4} xl={3} key={location.id}>
                    <LocationItem location={location} />
                  </Grid>
                ))
              ) : (
                <Grid item className={styles.noLocationsWrapper}>
                  <Typography variant="h4" mb={3}>
                    Couldn't find what you're looking for? Don't worry!
                    <br /> Let us know, and we'll hunt it down for you.
                  </Typography>
                  <Button variant="contained" onClick={handleButtonClick}>
                    Request Location Addition
                  </Button>
                  {successMessage && (
                    <Typography variant="body1">{successMessage}</Typography>
                  )}
                  <Typography variant="h6" mt={3}>
                    if we locate your desired location, we'll make sure to add
                    it to our site for everyone to discover!"
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Locations;
