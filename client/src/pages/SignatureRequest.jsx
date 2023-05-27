import React, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../App.js";
import axios from "axios";
import { Container, Grid, Button, Typography, Modal, Snackbar, Alert } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import { MainContainer, MainBox } from "../Style";

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

  const getSignRequestList = useCallback(async () => {
    try {
      const userId = user._id;
      const signListUrl = `${process.env.REACT_APP_API_URL}/sign/request-student/${userId}`;
      const { data } = await axios.get(signListUrl, { withCredentials: true });
      setSignRequestList(data);
    } catch (err) {
      console.log(err);
    }
  }, [user._id]);

  useEffect(() => {
    getSignRequestList();
  }, [getSignRequestList]);

  return (
    <MainContainer>
      <Snackbar open={sentAlert} autoHideDuration={6000} onClose={() => setSentAlert(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setSentAlert(false)} severity="success">
          Signature Request Sent!
        </Alert>
      </Snackbar>
      <MainBox>
        <Container maxWidth="xl">
          <Grid container sx={{ py: 4 }}>
            <Grid item xs={12} md={8} xl={9}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: "bold" }}>
                Signature Request
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
              <Button startIcon={<AddIcon />} fullWidth variant="contained" size="large" onClick={handleOpen} sx={{ borderRadius: "40px", boxShadow: 4, mt: { sm: 1, xs: 1, md: 0, lg: 0, xl: 0 } }}>
                New Signature Request
              </Button>
              <Modal open={open} onClose={handleClose}>
                <>
                  <SignatureRequestModal formValues={formValues} onClose={handleClose} handleChange={handleChange} handleFileChange={handleFileChange} setSentAlert={setSentAlert} getSignRequestList={getSignRequestList} />
                </>
              </Modal>
            </Grid>
            <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }}>
              <SignatureRequestTable signRequestList={signRequestList} />
            </Grid>
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default SignatureRequest;
