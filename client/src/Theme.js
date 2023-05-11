import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#8E1537",
      light: "963C55",
      // contrastText: "#FFFFFF"
    },
    background: {
      default: "#e4e4e4",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  overrides: {},
});

export default Theme;
