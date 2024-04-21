import { useMediaQuery } from "@mui/material";

const useMediaQueryScreen = () => {
  const isSmallScreen: boolean = useMediaQuery("(max-width:600px)");

  return { isSmallScreen };
};

export default useMediaQueryScreen;
