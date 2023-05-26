import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";

import { Container, Box, Paper, Typography, Button, TextField, LinearProgress, Grid, Snackbar, Alert } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import SignDocumentForm from "../SignInfo";

const SignDocumentModal = (props) => {
  const row = props.rowData;
  const user = useContext(UserContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formValues, setFormValues] = useState({
    rowId: row._id,
    reasonForRejecting: "",
    contractAddress: "",
    userId: user._id,
  });

  const handleClose = () => {
    props.onClose();
  };

  const handleSuccessAlert = (alert, message) => {
    props.setSuccessAlert(alert);
    props.setSuccessMessage(message);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRejectRequest = async () => {
    if (formValues.reasonForRejecting === "") {
      setAlert(true);
      setAlertMessage("Reason For Rejecting Field cannot be empty!");
    } else {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/sign/sign-document/rejected`, formValues);
      if (data.data === "Success") {
        props.getSignRequestList();
        handleSuccessAlert(true, "Signature Request Denied!");
        handleClose();
      }
    }
  };

  const handleSignDocument = async () => {
    //check if contract is deployed
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/contract/has-contract`, { withCredentials: true });
    formValues.contractAddress = data.length === 0 ? "" : data[0].address;
    console.log(formValues.contractAddress);

    if (data.length === 0) {
      setAlert(true);
      setAlertMessage("No Smart Contract deployed! Contact Admin.");
    } else {
      setIsUploading(true);

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/contract/sign-document/new`, formValues);

      if (data.data === "Success") {
        setIsUploading(false);
        props.getSignRequestList();
        handleSuccessAlert(true, "Sign Document Success!");
        handleClose();
      } else {
        setAlert(true);
        setAlertMessage(data.dataError);
        handleClose();
      }
    }
  };

  return (
    <Container disableGutters maxWidth="md" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage: "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: "40px",
          backdropFilter: "blur(50px)",
          mt: "100px",
          pb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: "7px",
            mr: "13px",
          }}
        >
          <CloseIcon fontSize="medium" color="primary" cursor="pointer" onClick={handleClose} />
        </Box>
        <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
          <Alert elevation={6} variant="filled" onClose={() => setAlert(false)} severity="error">
            {alertMessage}
          </Alert>
        </Snackbar>
        <Typography variant="h4" align="center" sx={{ color: "primary.main", pt: "5px", fontWeight: "medium" }}>
          Sign Document Request
        </Typography>
        <SignDocumentForm rowData={row} student={false} />
        {row.status === "Pending" && (
          <>
            {!isRejected && !isUploading && (
              <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Button variant="contained" size="large" onClick={handleSignDocument} sx={{ mx: 3, borderRadius: "40px" }}>
                  Sign Document
                </Button>
                <Button variant="outlined" size="large" onClick={() => setIsRejected(true)} sx={{ mx: 3, borderRadius: "40px" }}>
                  Reject Request
                </Button>
              </Box>
            )}
            {isRejected && (
              <Grid container sx={{ px: 6, display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} sm={12} pt={3}>
                  <TextField required id="reasonForRejecting" name="reasonForRejecting" label="Reason for Rejecting" fullWidth value={formValues.reasonForRejecting} onChange={handleChange} variant="outlined" multiline InputLabelProps={{ required: false }} rows={8} />
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <Button variant="contained" size="large" onClick={handleRejectRequest} sx={{ mx: 2, borderRadius: "40px" }}>
                    Submit
                  </Button>
                  <Button variant="outlined" size="large" onClick={handleClose} sx={{ mx: 2, borderRadius: "40px" }}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            )}
            {isUploading && (
              <>
                <LinearProgress />
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <Typography variant="h6">Signing... </Typography>
                </Box>
              </>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SignDocumentModal;
