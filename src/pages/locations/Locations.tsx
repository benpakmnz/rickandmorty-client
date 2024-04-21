import { Button, Grid, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useState } from "react";
import LocationItem, {
  ILocationAttr,
} from "../../components/locationItem/LocationItem";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getLocations } from "../../services/apiLocation";
import { addLocationRequest } from "../../services/apiLocationRequests";
import useDebounce from "../../hooks/useDebounce";
import styles from "./styles.module.scss";
import Loader from "../../components/loader/Loader";

const Locations: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const debouncedSearchValue = useDebounce(searchInput, 500);

  const { data: locationsList, isLoading } = useQuery<ILocationAttr[]>({
    queryKey: ["locations", debouncedSearchValue],
    queryFn: async () => {
      const data = await getLocations(searchInput);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: (data: string) => addLocationRequest(data),
    onSuccess: () => {
      setSuccessMessage("Your requset has been submitted, thank you ");
    },
  });

  const handleButtonClick = async () => {
    mutation.mutate(searchInput);
  };

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <Grid container spacing={5} mt={5} className={styles.locationWrapper}>
      <Grid item xs={12} lg={8} xl={6}>
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
        <Grid container spacing={2} justifyContent="left" alignItems="center">
          {locationsList && locationsList.length > 0 ? (
            locationsList?.map((location) => (
              <Grid item xs={6} lg={4} xl={3}>
                <LocationItem location={location} key={location.id} />
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
              {successMessage && <p>{successMessage}</p>}
              <Typography variant="h6" mt={3}>
                if we locate your desired location, we'll make sure to add it to
                our site for everyone to discover!"
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Locations;
