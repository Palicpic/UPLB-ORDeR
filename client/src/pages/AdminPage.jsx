import React, { useState } from "react";

import { Container, Box, Grid, Typography, Tab, Tabs } from "@mui/material/";
import { MainContainer, MainBox } from "../Style";

import ManageUser from "../components/Admin/ManageUser";
import SmartContract from "../components/Admin/SmartContract";
import BlockchainData from "../components/Admin/BlockchainData";

const AdminPage = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainContainer>
      <MainBox>
        <Container maxWidth="xl">
          <Grid container sx={{ py: 4 }}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: "bold" }}>
                Admin
              </Typography>
            </Grid>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Users" value={1} />
                  <Tab label="Smart Contract" value={2} />
                  <Tab label="Documents saved in Blockchain" value={3} />
                </Tabs>
              </Box>
            </Box>
            {value === 1 && <ManageUser />}
            {value === 2 && <SmartContract />}
            {value === 3 && <BlockchainData />}
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default AdminPage;
