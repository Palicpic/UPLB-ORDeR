import React from "react";
import { Container, Box, Paper, Typography, Button, Grid, TextField } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";

const FormModalSignature = (props) => {
  const formValues = props.formValues;

  const handleClose = () => {
    props.onClose();
  };
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleFileChange = (e) => {
    props.handleFileChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/signature-request/new`, formValues)
      .then((response) => {
        console.log("Data saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <Container disableGutters maxWidth="lg" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage: "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          height: "90vh",
          overflow: "auto",
          mt: "70px",
          borderRadius: "25px",
          backdropFilter: "blur(50px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: "5px",
            mr: "10px",
          }}
        >
          <CloseIcon fontSize="medium" color="primary" cursor="pointer" onClick={handleClose} />
        </Box>
        <Typography component="h1" variant="h4" align="center" sx={{ color: "primary.main", pt: "5px", fontWeight: "medium" }}>
          New Signature Request
        </Typography>
        <Box sx={{ px: 8 }}>
          <Grid container spacing={1} pt={5}>
            <Grid item xs={12} sm={8}>
              <TextField required id="recipient" name="recipient" label="Send To" fullWidth value={formValues.recipient} onChange={handleChange} variant="standard" type="email" InputLabelProps={{ required: false }} />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={8}>
              <TextField required id="message" name="subject" label="Subject" fullWidth value={formValues.subject} onChange={handleChange} variant="standard" InputLabelProps={{ required: false }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField required id="message" name="message" label="Message" fullWidth value={formValues.message} onChange={handleChange} variant="outlined" multiline InputLabelProps={{ required: false }} rows={12} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <form>
                <input
                  required
                  accept="application/pdf"
                  name="pdfFile"
                  // className={classes.input}
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  label="File Upload"
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" size="large" onClick={handleSubmit} sx={{ mt: 3 }} endIcon={<SendIcon />}>
                Send Request
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormModalSignature;
