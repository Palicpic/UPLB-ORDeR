import React, { useState } from "react";
import axios from "axios";

import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Grid, TextField, Button, Alert, Snackbar } from "@mui/material/";

const sems = ["All semesters enrolled", "1st Semester", "2nd Semester", "Midterm"];
const reason = ["Extension", "Medical/Law School", "Scholarship", "Readmission", "Graduate Study", "Student Org Recognition", "Job Application/OJT", "Reinstatement", "Transfer/Shift", "Others"];
const classification = ["Freshman", "Sophomore", "Junior", "Senior"];
const colleges = ["CAFS", "CAS", "CDC", "CEAT", "CEM", "CFNR", "CHE", "CVM"];
const docs = ["Form 5", "True Copy of Grades", "Certification: Bonafide Student", "Certification: Completion of Academic Requirements", "Certification: Completion of PE (PEPE)", "Certification: General Weighted Average", "Certification: Good Moral Character signed by the College Secretary", "Certification: Good Moral Character signed by the Dean", "Certification: Graduation", "Certification: Non-contract", "Certification: Prospective candidate for graduation", "Certification: Scholastic Standing", "Certification: Units earned", "Certification: Units required in curriculum", "Certification: Year level/Classification", "Other:"];

const DocumentRequestForm = (props) => {
  const formValues = props.formValues;
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    props.handleChange(e);
    setAlert(false);
  };

  const handleErrors = () => {
    const { displayName, college, number, classification, saisNum, address, mobileNum, adviser, degreeProgram, contactPersonName, contactPersonAddress, contactPersonMobileNum, documentName, semester, acadYear, otherDocName, reasonChoice, otherReason } = formValues;

    if (reasonChoice === "" || displayName === "" || number === "" || degreeProgram === "" || mobileNum === "" || classification === "" || college === "") return true;

    if (reasonChoice === "Others" && otherReason === "") return true;

    if (documentName === "Other:" && otherDocName === "") return true;
    else if (documentName === "True Copy of Grades" && (semester === "" || acadYear === "")) return true;
    else if (documentName === "Form 5" && (saisNum === "" || address === "" || adviser === "" || contactPersonName === "" || contactPersonMobileNum === "" || contactPersonAddress === "")) return true;
    else if (documentName === "") return true;

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleErrors()) setAlert(true);
    else {
      try {
        const { data } = await axios.post(`/document/new-request`, formValues);
        if (data.data === "Success") {
          props.getDocRequestList();
          props.setSuccessAlert(true);
          formValues.documentName = formValues.semester = formValues.acadYear = formValues.otherDocName = formValues.reasonChoice = formValues.otherReason = "";
          props.handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box sx={{ px: 5, pt: 3 }}>
      <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setAlert(false)} severity="error">
          Required Fields cannot be empty!
        </Alert>
      </Snackbar>
      <Typography variant="h6">Document Information</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="docname">Document Request</InputLabel>
            <Select labelId="select-doc-label" id="select-doc" name="documentName" value={formValues.documentName} label="Document Request*" onChange={handleChange}>
              {docs.map((doc) => (
                <MenuItem key={doc} value={doc}>
                  <Typography>{doc}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* "True Copy of Grades" */}
        {formValues.documentName === "True Copy of Grades" && (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth variant="standard">
                <InputLabel id="semester">Semester</InputLabel>
                <Select labelId="select-semester-label" id="select-semester" label="Semester*" name="semester" value={formValues.semester} onChange={handleChange}>
                  {sems.map((i) => (
                    <MenuItem key={i} value={i}>
                      <Typography>{i}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="acadyear" label="Academic Year (20xx-20xx)" fullWidth name="acadYear" value={formValues.acadYear} onChange={handleChange} variant="standard" />
            </Grid>
          </>
        )}
        {/* Other Document */}
        {formValues.documentName === "Other:" && (
          <Grid item xs={12} sm={12}>
            <TextField required id="Other" name="otherDocName" label="Specify document" fullWidth value={formValues.otherDocName} onChange={handleChange} variant="standard" />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="reasonChoice">Reason for Requesting</InputLabel>
            <Select labelId="select-reason-label" id="select-reason" label="Reason for Requesting*" name="reasonChoice" value={formValues.reasonChoice} onChange={handleChange}>
              {reason.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {formValues.reasonChoice === "Others" && (
          <Grid item xs={12} sm={6}>
            <TextField required id="reason-text" name="otherReason" label="Other Reason (Please Specify)" fullWidth value={formValues.otherReason} onChange={handleChange} variant="standard" />
          </Grid>
        )}
      </Grid>

      <Typography variant="h6" sx={{ mt: 5 }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField required id="displayName" name="displayName" label="Name" fullWidth value={formValues.displayName} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="studnum" name="number" label="Student Number (20XX-XXXXX)" fullWidth value={formValues.number} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="degProg" name="degreeProgram" label="Degree Program (BS Computer Science)" fullWidth value={formValues.degreeProgram} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required disabled id="email" name="email" label="Email Address" fullWidth value={formValues.email} onChange={handleChange} variant="standard" type="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="mobileNum" name="mobileNum" label="Mobile Number" fullWidth value={formValues.mobileNum} onChange={handleChange} variant="standard" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="classification">Classification</InputLabel>
            <Select labelId="select-classification-label" id="select-classification" label="Classification*" name="classification" value={formValues.classification} onChange={handleChange}>
              {classification.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="college">College</InputLabel>
            <Select labelId="select-college-label" id="select-college" name="college" value={formValues.college} label="Document Request*" onChange={handleChange}>
              {colleges.map((college) => (
                <MenuItem key={college} value={college}>
                  <Typography>{college}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {formValues.documentName === "Form 5" && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField required id="saisnum" name="saisNum" label="SAIS Number" fullWidth value={formValues.saisNum} onChange={handleChange} variant="standard" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField required id="adviser" name="adviser" label="Adviser" fullWidth value={formValues.adviser} onChange={handleChange} variant="standard" />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField required id="address" name="address" label="Home Address" fullWidth value={formValues.address} onChange={handleChange} variant="standard" multiline />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mt: "20px" }}>
            <Typography variant="h7">Contact Person:</Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <TextField required id="fullnameContact" name="contactPersonName" label="Name" fullWidth value={formValues.contactPersonName} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField required id="mobileNumContact" name="contactPersonMobileNum" label="Mobile Number" fullWidth value={formValues.contactPersonMobileNum} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField required id="addressContact" name="contactPersonAddress" label="Home Address" fullWidth value={formValues.contactPersonAddress} onChange={handleChange} variant="standard" />
          </Grid>
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
        <Button variant="contained" size="large" onClick={handleSubmit} sx={{ m: 3, borderRadius: "40px" }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentRequestForm;
