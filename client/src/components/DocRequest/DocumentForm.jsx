import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Grid, TextField } from "@mui/material/";

const sems = ["All semesters enrolled", "1st Semester", "2nd Semester", "Midterm"];
const reason = ["Extension", "Medical/Law School", "Scholarship", "Readmission", "Graduate Study", "Student Org Recognition", "Job Application/OJT", "Reinstatement", "Transfer/Shift", "Others"];
const classification = ["Freshman", "Sophomore", "Junior", "Senior"];

const DocumentForm = (props) => {
  const docs = props.docs;
  const colleges = props.colleges;
  const formValues = props.formValues;

  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleFileChange = (e) => {
    props.handleFileChange(e);
  };

  console.log(formValues);

  return (
    <Box sx={{ px: 8 }}>
      <Typography variant="h6" gutterBottom>
        Document Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="docname">Document Request</InputLabel>
            <Select labelId="select-doc-label" id="select-doc" name="documentName" value={formValues.documentName} label="Document Request*" onChange={handleChange}>
              {docs.map((doc) => (
                <MenuItem key={doc.name} value={doc.name}>
                  <Typography>{doc.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
        <Grid item xs={12} sm={12}>
          <TextField required id="Other" name="otherDocName" label="Other" fullWidth value={formValues.otherDocName} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="reason">Reason for Requesting</InputLabel>
            <Select labelId="select-reason-label" id="select-reason" label="Reason for Requesting*" name="reason" value={formValues.reason} onChange={handleChange}>
              {reason.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="reason-text" name="otherReason" label="Other Reason (Please Specify)" fullWidth value={formValues.otherReason} onChange={handleChange} variant="standard" />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField required id="displayName" name="displayName" label="Name" fullWidth value={formValues.displayName} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* //create as num, no dash */}
          <TextField required id="studnum" name="studNum" label="Student Number" fullWidth value={formValues.studNum} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="saisnum" name="saisNum" label="SAIS Number" fullWidth value={formValues.saisNum} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="degProg" name="degProg" label="Degree Program" fullWidth value={formValues.degProg} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="adviser" name="adviser" label="Adviser" fullWidth value={formValues.adviser} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* disable email */}
          <TextField required id="email" name="email" label="Email Address" fullWidth value={formValues.email} onChange={handleChange} variant="standard" type="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="mobileNum" name="mobileNum" label="Mobile Number" fullWidth value={formValues.mobileNum} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField required id="address" name="address" label="Home Address" fullWidth value={formValues.address} onChange={handleChange} variant="standard" multiline />
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
                <MenuItem key={college.name} value={college.name}>
                  <Typography>{college.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <form>
            <Box display="flex">
              <img src={formValues.idPic} alt="Student ID" style={{ maxWidth: "100%" }} />
            </Box>
            <input
              required
              accept="image/*"
              name="idPic"
              // className={classes.input}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              label="ID Picture"
            />
          </form>
        </Grid>

        <Grid item xs={12} sm={12}></Grid>
        <Typography variant="h7" gutterBottom>
          Contact Person
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField required id="fullnameContact" name="contactName" label="Name" fullWidth value={formValues.contactName} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField required id="mobileNumContact" name="contactPNum" label="Mobile Number" fullWidth value={formValues.contactPNum} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField required id="addressContact" name="contactAdd" label="Home Address" fullWidth value={formValues.contactAdd} onChange={handleChange} variant="standard" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentForm;
