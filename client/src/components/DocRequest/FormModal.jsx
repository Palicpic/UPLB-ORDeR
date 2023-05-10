import React from "react";
import { Container, Box, Paper, Typography, Button } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import DocumentForm from "../DocRequest/DocumentForm";
import axios from "axios";

const FormModal = (props) => {
  const user = props.user;
  const docs = props.docs;
  const colleges = props.colleges;
  const formValues = props.formValues;

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/doc-request/new`, formValues)
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
          New Document Request
        </Typography>
        <DocumentForm docs={docs} user={user} colleges={colleges} formValues={formValues} handleChange={props.handleChange} handleFileChange={props.handleFileChange} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormModal;
