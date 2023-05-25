import { Button, Container, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavButton = (props) => {
  return (
    <Button
      variant="outlined"
      disableElevation
      size="large"
      elevation={12}
      sx={{
        mx: 0.1,
        mt: 3,
        display: "block",
        color: "primary",
        backgroundColor: "#d9d9d9",
        borderColor: "#d9d9d9",
        borderRadius: "5px 20px 0px 0px",
        "&:hover": {
          backgroundColor: "#efefef",
          borderColor: "#efefef",
        },
        "&.active": {
          backgroundColor: "white",
          borderColor: "white",
        },
      }}
      component={NavLink}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const MainContainer = (props) => {
  return <Container disableGutters maxWidth="false" sx={{ backgroundImage: "linear-gradient(178deg, rgba(142,21,55,1) 0%, rgba(150,60,85,1) 42%, rgba(255,255,255,1) 100%);" }} {...props} />;
};

const MainBox = (props) => {
  return <Box sx={{ bgcolor: "white", height: "92vh", borderRadius: "50px 50px 0 0", justifyContent: "center", overflow: "auto" }} {...props} />;
};

export { NavButton, MainContainer, MainBox };
