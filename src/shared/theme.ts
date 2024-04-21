import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#009688",
    },
  },
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
