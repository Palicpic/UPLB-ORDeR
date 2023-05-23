import React, { useState } from "react";
import axios from "axios";

import { Container, Box, Paper, Typography, Button, Grid, TextField, Snackbar, Alert } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const SignatureRequestModal = (props) => {
  const formValues = props.formValues;
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleFileChange = (e) => {
    props.handleFileChange(e);
  };

  const handleErrors = () => {
    const { recipient, subject, message, pdfFile } = formValues;

    if (recipient === "") {
      setAlertMessage("Send To (Email) Field is required!");
      return true;
    }
    if (subject === "") {
      setAlertMessage("Subject Field is required!");
      return true;
    }
    if (message === "") {
      setAlertMessage("Message Field is required!");
      return true;
    }
    if (pdfFile === "" || pdfFile === null || pdfFile === "undefined") {
      setAlertMessage("PDF File Attachment is required!");
      return true;
    }
    setAlertMessage("");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleErrors()) setAlert(true);
    else {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/sign/find-email/${formValues.recipient}`);
      if (data.length === 0 || data[0].role !== "faculty") {
        setAlertMessage("Recipient Faculty Email not found!");
        setAlert(true);
      } else {
        const formData = new FormData();

        for (const key in formValues) {
          if (formValues.hasOwnProperty(key)) {
            formData.append(key, formValues[key]);
          }
        }
        try {
          const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/sign/new-request`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (data.data === "Success") {
            props.setSentAlert(true);
            formValues.recipient = formValues.subject = formValues.message = formValues.pdfFile = "";
            handleClose();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <Container disableGutters maxWidth="lg" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage: "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          height: "70vh",
          overflow: "auto",
          borderRadius: "40px",
          backdropFilter: "blur(50px)",
          position: "absolute",
          bottom: "0%",
          right: { md: "0%", lg: "10%" },
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: "5px",
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
          New Signature Request
        </Typography>

        <Box sx={{ px: 5 }}>
          <Grid container spacing={2} pt={1}>
            <Grid item xs={12}>
              <TextField required id="recipient" name="recipient" label="Send To (email)" fullWidth value={formValues.recipient} onChange={handleChange} variant="standard" type="email" InputLabelProps={{ required: false }} />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="subject" name="subject" label="Subject" fullWidth value={formValues.subject} onChange={handleChange} variant="standard" InputLabelProps={{ required: false }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField required id="message" name="message" label="Message" fullWidth value={formValues.message} onChange={handleChange} variant="outlined" multiline InputLabelProps={{ required: false }} rows={12} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input required accept="application/pdf" name="pdfFile" id="file-upload" type="file" onChange={handleFileChange} label="File Upload" />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={handleSubmit} endIcon={<SendIcon />} sx={{ m: 3, borderRadius: "40px" }}>
            Send Request
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignatureRequestModal;
