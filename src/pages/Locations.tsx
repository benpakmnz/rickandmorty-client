import { Button, Grid, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useState } from "react";
import LocationItem, {
  ILocationAttr,
} from "../components/locationItem/LocationItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLocations } from "../services/apiLocation";
import { addLocationRequest } from "../services/apiLocationRequests";
import useDebounce from "../hooks/useDebounce";

const Locations: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const debouncedSearchValue = useDebounce(searchInput, 1000);

  const { data: locationsList, isError } = useQuery<ILocationAttr[]>({
    queryKey: ["locations", debouncedSearchValue],
    queryFn: async () => {
      const data = await getLocations(searchInput);
      return data;
    },
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
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      sx={{ maxWidth: "1500px", margin: "auto" }}
    >
      <Grid item>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for location"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value)
            }
          />
          <SearchIcon />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="center">
          {locationsList && !isError && locationsList.length > 0 ? (
            locationsList?.map((location) => (
              <LocationItem location={location} key={location.id} />
            ))
          ) : (
            <Grid item sx={{ textAlign: "center" }}>
              <Typography variant="h6">
                Couldn't find what you're looking for? Don't worry!
                <br /> Let us know, and we'll hunt it down for you.
              </Typography>
              <Button variant="contained" onClick={handleButtonClick}>
                Request Location Addition
              </Button>
              {successMessage && <p>{successMessage}</p>}
              <p>
                if we locate your desired location, we'll make sure to add it to
                our site for everyone to discover!"
              </p>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Locations;
