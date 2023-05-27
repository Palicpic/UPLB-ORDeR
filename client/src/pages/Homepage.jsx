import React, { useContext, useState } from "react";
import { UserContext } from "../App.js";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Typography, Container, Box, Button, Paper, TextField, MenuItem } from "@mui/material";

import waveLogo from "../assets/wave.svg";
import folder from "../assets/folder_home.png";

const roleOptions = ["Student", "Faculty", "OCS Staff"];

const Homepage = () => {
  const user = useContext(UserContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const [roleValue, setRoleValue] = useState("Student");

  const imgHeight = matches ? "40vh" : "55vh";

  const handleChange = (event) => {
    setRoleValue(event.target.value);
  };

  const handleProceed = async () => {
    const id = user._id;
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/admin/user/edit-role/${id}`, { roleValue });
    if (data.data === "Success") {
      console.log("henlo");
      window.location.reload();
    }
  };

  return (
    <Container disableGutters maxWidth="false" position="relative">
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          bgcolor: "primary.main",
          pt: { xl: 25, lg: 35, md: 40, sm: 55, xs: 80 },
        }}
      >
        <img src={waveLogo} alt="wave" style={{ width: "100%", height: "auto" }}></img>
      </Box>
      <Container maxWidth="xl" sx={{ position: "absolute", top: { xs: "55%", sm: "40%", md: "40%", lg: "50%", xl: "45%" }, left: "50%", transform: "translate(-50%, -50%)", pb: "100px", mt: "100px" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={7} xl={6}>
            <Box sx={{ color: "white", mt: 15, pr: "80px", pl: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: "70px", my: 1 }}>
                UPLB-ORDeR
              </Typography>
              <Typography variant="h5">Online Request of Documents and e-Signature Request System with Authentication and Verification using Smart Contract on Ethereum Blockchain</Typography>
            </Box>
            <Button
              variant="outlined"
              size="large"
              href="/verify-document"
              sx={{
                ml: 3,
                mt: 4,
                color: "primary",
                bgcolor: "white",
                fontWeight: "bold",
                borderRadius: "40px",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Verify a Document
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={5} xl={6} sx={{ display: "flex", justifyContent: "center", pt: { xs: "30px", sm: "50px", md: "80px", lg: "80px", xl: "0px" }, pr: "20px" }}>
            {user && (
              <Paper
                elevation={5}
                sx={{
                  backgroundImage: "linear-gradient(160deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 90%)",
                  maxHeight: "80vh",
                  minHeight: "30vh",
                  maxWidth: "100%",
                  minWidth: "400px",
                  borderRadius: "40px",
                  backdropFilter: "blur(50px)",
                  p: 3,
                }}
              >
                <Typography variant="h4" fontWeight="bold" color="primary.main" display="flex" justifyContent="center">
                  Welcome
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main" display="flex" justifyContent="center" mt={11}>
                  Hi, {user.name.firstName}!
                </Typography>
                <Typography variant="h7" fontWeight="500" display="flex" justifyContent="center" mt={7}>
                  Choose user type to proceed:
                </Typography>
                <Box display="flex" justifyContent="center" flexDirection="column">
                  <TextField select value={roleValue} onChange={handleChange} variant="filled" label="I am a" fullWidth sx={{ pt: 2 }}>
                    {roleOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    onClick={handleProceed}
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 8,
                      borderRadius: "40px",
                    }}
                  >
                    Proceed
                  </Button>
                </Box>
              </Paper>
            )}
            {!user && <img src={folder} alt="folders" style={{ height: imgHeight }} />}
          </Grid>
        </Grid>
      </Container>
      <Paper sx={{ width: "100%", position: "fixed", bottom: 0 }} square variant="outlined">
        <Container>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my: 1,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©2023. CMSC 190 ICS UPLB
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

export default Homepage;
