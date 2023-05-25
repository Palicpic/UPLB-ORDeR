import React, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../App.js";
import axios from "axios";

import { Container, Box, Grid, Typography, Snackbar, Alert } from "@mui/material/";
import { MainContainer, MainBox } from "../Style";

import IssueDocumentTable from "../components/IssueDocument/Table.IssueDocument.jsx";

const IssueDocument = () => {
  const user = useContext(UserContext);
  const [docRequestList, setDocRequestList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getDocRequestList = useCallback(async () => {
    try {
      const userCollege = user.college;
      const docListUrl = `${process.env.REACT_APP_API_URL}/document/request-ocs/${userCollege}`;
      const { data } = await axios.get(docListUrl, { withCredentials: true });
      setDocRequestList(data);
    } catch (err) {
      console.log(err);
    }
  }, [user.college]);

  useEffect(() => {
    getDocRequestList();
  }, [getDocRequestList]);

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
                Issue Document
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }}>
              <IssueDocumentTable docRequestList={docRequestList} setAlertMessage={setAlertMessage} setSuccessAlert={setSuccessAlert} getDocRequestList={getDocRequestList} />
            </Grid>
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default IssueDocument;
