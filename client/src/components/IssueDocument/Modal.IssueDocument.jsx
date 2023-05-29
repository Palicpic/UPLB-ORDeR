import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";

import { Container, Box, Paper, Typography, Button, TextField, LinearProgress, Grid, Snackbar, Alert } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import DocumentInfo from "../DocumentInfo";

const IssueDocumentModal = (props) => {
  const row = props.rowData;
  const user = useContext(UserContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isIssueDoc, setIsIssueDoc] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formValues, setFormValues] = useState({
    rowId: row._id,
    reasonForRejecting: "",
    studentFile: null,
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

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
  };

  const handleRejectRequest = async () => {
    if (formValues.reasonForRejecting === "") {
      setAlert(true);
      setAlertMessage("Reason For Rejecting Field cannot be empty!");
    } else {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/document/issue-document/rejected`, formValues);
      if (data.data === "Success") {
        props.getDocRequestList();
        handleSuccessAlert(true, "Document Request Denied!");
        handleClose();
      }
    }
  };

  const handleIssueDocument = async () => {
    if (formValues.studentFile === null || formValues.studentFile === "") {
      setAlert(true);
      setAlertMessage("File Upload is required!");
    } else {
      //check if contract is deployed
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/contract/has-contract`, { withCredentials: true });
      formValues.contractAddress = data.length === 0 ? "" : data.address;
      console.log(formValues.contractAddress);

      if (data.length === 0) {
        setAlert(true);
        setAlertMessage("No Smart Contract deployed! Contact Admin.");
      } else {
        setIsUploading(true);

        const formData = new FormData();

        for (const key in formValues) {
          if (formValues.hasOwnProperty(key)) {
            formData.append(key, formValues[key]);
          }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/contract/issue-document/new`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data.data === "Success") {
          setIsUploading(false);
          props.getDocRequestList();
          handleSuccessAlert(true, "Issue Document Success!");
          handleClose();
        } else {
          setAlert(true);
          setAlertMessage(data.dataError);
          handleClose();
        }
      }
    }
  };

  return (
    <Container disableGutters maxWidth="md" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage: "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          maxHeight: "80vh",
          // maxWidth: "md",
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
          Document Request
        </Typography>
        <DocumentInfo rowData={row} isIssue={true} />
        {row.status === "Pending" && (
          <>
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
            {isIssueDoc && !isUploading && (
              <Grid container sx={{ px: 6, display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} sm={12} pt={3}>
                  <TextField id="file-input" name="studentFile" inputProps={{ accept: "application/pdf" }} variant="outlined" type="file" label="File Upload" required onChange={handleFileChange} fullWidth />
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <Button variant="contained" size="large" onClick={handleIssueDocument} sx={{ mx: 2, borderRadius: "40px" }}>
                    Submit
                  </Button>
                  <Button variant="outlined" size="large" onClick={handleClose} sx={{ mx: 2, borderRadius: "40px" }}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            )}
            {!isRejected && !isIssueDoc && (
              <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Button variant="contained" size="large" onClick={() => setIsIssueDoc(true)} sx={{ mx: 3, borderRadius: "40px" }}>
                  Issue Document
                </Button>
                <Button variant="outlined" size="large" onClick={() => setIsRejected(true)} sx={{ mx: 3, borderRadius: "40px" }}>
                  Reject Request
                </Button>
              </Box>
            )}
          </>
        )}
        {isUploading && (
          <>
            <LinearProgress />
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <Typography variant="h6">Authenticating... </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default IssueDocumentModal;
