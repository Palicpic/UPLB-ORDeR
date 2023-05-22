import React from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Typography, Container, Box, Button, Paper } from "@mui/material";

import waveLogo from "../assets/wave.svg";
import folder from "../assets/folder_home.png";

const Homepage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const imgHeight = matches ? "40vh" : "55vh";

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
      <Container maxWidth="xl" sx={{ position: "absolute", top: { xs: "60%", sm: "35%", md: "40%", lg: "50%", xl: "45%" }, left: "50%", transform: "translate(-50%, -50%)" }}>
        <Grid container>
          <Grid item xs={12} sm={7} md={7} xl={6}>
            <Box sx={{ color: "white", mt: 15, pr: "55px" }}>
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
          <Grid item xs={12} sm={5} md={5} xl={6} sx={{ display: "flex", justifyContent: "center", pt: { xs: "30px", sm: "150px", md: "80px", lg: "80px", xl: "0px" }, pr: "20px" }}>
            <img src={folder} alt="folders" style={{ height: imgHeight }} />
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
