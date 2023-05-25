import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Container, Box, Grid, Typography, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material/";
import { MainContainer, MainBox } from "../Style";

const choices = ["Enter Document Transaction Hash", "Upload Document"];

const VerifyDocument = () => {
  const [formValues, setFormValues] = useState({
    choice: "",
    transactionHash: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onDrop = (acceptedFiles) => {
    // Handle the dropped files here
    console.log(acceptedFiles);
    setFormValues({ ...formValues, file: acceptedFiles });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(formValues.choice);

  return (
    <MainContainer>
      <MainBox>
        <Container maxWidth="sm">
          <Grid container sx={{ py: 4 }}>
            <Grid item sm={12} lg={12} justifyContent="center" display="flex">
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: "bold" }}>
                Verify Document
              </Typography>
            </Grid>
            <Grid item sm={12} lg={12} justifyContent="center" display="flex">
              <FormControl required fullWidth variant="standard">
                <InputLabel id="choice">Choose option to verify document</InputLabel>
                <Select labelId="select-choice-label" id="select-choice" label="Verification Option*" name="choice" value={formValues.choice} onChange={handleChange}>
                  {choices.map((i) => (
                    <MenuItem key={i} value={i}>
                      <Typography>{i}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {formValues.choice === "Enter Document Transaction Hash" && (
              <Grid item sm={12} lg={12} justifyContent="center" display="flex">
                <TextField required id="transactionHash" label="Transaction Hash" fullWidth name="transactionHash" value={formValues.transactionHash} onChange={handleChange} variant="standard" />
              </Grid>
            )}
            {formValues.choice === "Upload Document" && formValues.file === null && (
              <Grid item sm={12} lg={12} justifyContent="center" display="flex">
                <div {...getRootProps()} style={{ textAlign: "center", padding: "2rem", border: "2px dashed #aaa", borderRadius: "40px" }}>
                  <input {...getInputProps()} />
                  {isDragActive ? <p>Drop the files here...</p> : <p>Drag and drop files here, or click to select files</p>}
                  <Button color="primary" sx={{ borderRadius: "40px" }}>
                    Select Files
                  </Button>
                </div>
              </Grid>
            )}
            {formValues.choice !== "" && (
              <Grid item sm={12} lg={12} justifyContent="center" display="flex">
                <Button variant="contained">Verify</Button>
              </Grid>
            )}
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default VerifyDocument;
