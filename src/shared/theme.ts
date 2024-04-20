import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
