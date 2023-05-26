import { Container, Box, Grid, Button, Typography, Modal, Snackbar, Alert, Paper } from "@mui/material/";
import { MainContainer, MainBox, PaperAdmin } from "../Style";

import ManageUser from "../components/Admin/ManageUser";

const AdminPage = () => {
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
            <Grid item xs={12} md={6}>
              <PaperAdmin>
                <ManageUser />
              </PaperAdmin>
            </Grid>
            <Grid item xs={12} md={6}>
              <PaperAdmin>2</PaperAdmin>
            </Grid>
            <Grid item xs={12} md={6}>
              <PaperAdmin>3</PaperAdmin>
            </Grid>
            <Grid item xs={12} md={6}>
              <PaperAdmin>4</PaperAdmin>
            </Grid>
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default AdminPage;
