import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App.js";
import axios from "axios";
import { Container, Box, Grid, Button, Typography, Modal, Snackbar, Alert } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import { MainContainer } from "../Style";

import SignatureRequestTable from "../components/SignatureRequest/Table.SignatureRequest.jsx";
import SignatureRequestModal from "../components/SignatureRequest/Modal.SigntureRequest.jsx";

const SignatureRequest = () => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [signRequestList, setSignRequestList] = useState([]);
  const [sentAlert, setSentAlert] = useState(false);

  const [formValues, setFormValues] = React.useState({
    recipient: "",
    subject: "",
    message: "",
    pdfFile: null,
    userId: user._id,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
  };

  const getSignRequestList = async () => {
    try {
      const userId = user._id;
      const signListUrl = `${process.env.REACT_APP_API_URL}/sign/request/${userId}`;
      const { data } = await axios.get(signListUrl, { withCredentials: true });
      setSignRequestList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSignRequestList();
  });

  return (
    <MainContainer>
      <Snackbar open={sentAlert} autoHideDuration={6000} onClose={() => setSentAlert(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setSentAlert(false)} severity="success">
          Signature Request Sent!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          bgcolor: "white",
          height: "90vh",
          borderRadius: "50px 50px 0 0",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <Container maxWidth="xl">
          <Grid container sx={{ py: 4 }}>
            <Grid item xs={12} md={8} xl={9} sx={{ my: 2 }}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: "bold" }}>
                Signature Request
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} xl={3} sx={{ my: 2 }}>
              <Button startIcon={<AddIcon />} fullWidth variant="contained" size="large" onClick={handleOpen} sx={{ borderRadius: "40px", boxShadow: 4 }}>
                New Signature Request
              </Button>
              <Modal open={open} onClose={handleClose}>
                <>
                  <SignatureRequestModal formValues={formValues} onClose={handleClose} handleChange={handleChange} handleFileChange={handleFileChange} setSentAlert={setSentAlert} />
                </>
              </Modal>
            </Grid>
            <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
              <SignatureRequestTable signRequestList={signRequestList} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainContainer>
  );
};

export default SignatureRequest;
