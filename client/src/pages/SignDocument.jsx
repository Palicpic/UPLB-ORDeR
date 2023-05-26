import React, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../App.js";
import axios from "axios";

import { Container, Grid, Typography, Snackbar, Alert } from "@mui/material/";
import { MainContainer, MainBox } from "../Style";

import SignDocumentTable from "../components/SignDocument/Table.SignDocument.jsx";

const SignDocument = () => {
  const user = useContext(UserContext);
  const [signRequestList, setSignRequestList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getSignRequestList = useCallback(async () => {
    try {
      const userId = user._id;
      const signListUrl = `${process.env.REACT_APP_API_URL}/sign/request-faculty/${userId}`;
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
      <Snackbar open={successAlert} autoHideDuration={6000} onClose={() => setSuccessAlert(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setSuccessAlert(false)} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      <MainBox>
        <Container maxWidth="xl">
          <Grid container sx={{ py: 4 }}>
            <Grid item xs={12} md={12} xl={12}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: "bold" }}>
                Sign Document
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }}>
              <SignDocumentTable signRequestList={signRequestList} setAlertMessage={setAlertMessage} setSuccessAlert={setSuccessAlert} getSignRequestList={getSignRequestList} />
            </Grid>
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default SignDocument;
