import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Grid, TextField } from "@mui/material/";

const sems = ["All semesters enrolled", "1st Semester", "2nd Semester", "Midterm"];
const reason = ["Extension", "Medical/Law School", "Scholarship", "Readmission", "Graduate Study", "Student Org Recognition", "Job Application/OJT", "Reinstatement", "Transfer/Shift", "Others"];
const classification = ["Freshman", "Sophomore", "Junior", "Senior"];

const DocumentForm = (props) => {
  const docs = props.docs;
  const user = props.user;

  const [formValues, setFormValues] = React.useState({
    // documentName: "test",
    // numOfCopies: "", to remove
    semester: "",
    acadYear: "",
    otherDocName: "",
    reason: "",
    otherReason: "",
    // displayName: user.displayName,
    // studNum: user.studNum,
    // saisNum: user.saisNum,
    // degProg: user.degProg,
    // adviser: user.adviser,
    // email: user.email,
    // mobileNum: user.mobileNum,
    // address: user.address,
    // classification: user.classification,
    // college: user.college,
    // idPic: user.idPic,
    // contactName: user.contactName,
    // contactPNum: user.contactPNum,
    // contactAdd: user.contactAdd,
  });

//user
email: user.email,
displayName: user.displayName,
college: user.college,

//student
studNum: user.studNum,
saisNum: user.saisNum,
degProg: user.degProg,
adviser: user.adviser,
mobileNum: user.mobileNum,
    address: user.address,
    classification: user.classification,
    idPic: user.idPic,

    documentName: "test",
    numOfCopies: "",
    semester: "",
    acadYear: "",
    otherDocName: "",
    reason: "",
    otherReason: "",

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log("target: " + e.target.name + " value: " + e.target.value);
  };

  console.log(formValues);
  return (
    <Box sx={{ px: 8 }}>
      <Typography variant="h6" gutterBottom>
        Document Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="docname">Document Request</InputLabel>
            <Select labelId="select-doc-label" id="select-doc" value={formValues.docName} label="Document Request*" onChange={handleChange}>
              {docs.map((doc) => (
                <MenuItem key={doc.name} value={doc.name}>
                  <Typography>{doc.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>{formValues.docName.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            type="number"
            id="copies"
            name="copies"
            label="Number of Copies"
            fullWidth
            value={formValues.numOfCopies}
            onChange={handleChange}
            variant="standard"
            inputProps={{
              min: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="semester">Semester</InputLabel>
            <Select labelId="select-semester-label" id="select-semester" label="Semester*" value={formValues.semester} onChange={handleChange}>
              {sems.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="acadyear" name="acadyear" label="Academic Year (20xx-20xx)" fullWidth value={formValues.acadYear} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField required id="Other" name="Other" label="Other" fullWidth value={formValues.otherDocName} onChange={handleChange} variant="standard" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="reason">Reason for Requesting</InputLabel>
            <Select labelId="select-reason-label" id="select-reason" label="Reason for Requesting*" value={formValues.reason} onChange={handleChange}>
              {reason.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="reason-text" name="reason-text" label="Other Reason (Please Specify)" fullWidth value={formValues.otherReason} onChange={handleChange} variant="standard" />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField required id="fullname" name="fullname" label="Name" fullWidth value={formValues.name} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="studnum" name="studnum" label="Student Number" fullWidth value={formValues.studNum} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="saisnum" name="saisnum" label="SAIS Number" fullWidth value={formValues.saisNum} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="degProg" name="degProg" label="Degree Program" fullWidth value={formValues.degProg} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="adviser" name="adviser" label="Adviser" fullWidth value={formValues.adviser} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="email" name="email" label="Email Address" fullWidth value={formValues.email} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="mobileNum" name="mobileNum" label="Mobile Number" fullWidth value={formValues.mobileNum} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField required id="address" name="address" label="Home Address" fullWidth value={formValues.address} onChange={handleChange} variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="classification">Classification</InputLabel>
            <Select labelId="select-classification-label" id="select-classification" label="Classification*" value={formValues.classification} onChange={handleChange}>
              {classification.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="college" name="college" label="College" fullWidth value={formValues.college} onChange={handleChange} variant="standard" />
        </Grid>

        <Grid item xs={12} sm={12}>
          <form>
            <input
              accept="image/*"
              // className={classes.input}
              id="file-upload"
              type="file"
              // onChange={handleFileChange}
            />
            {/* <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                // className={classes.button}
              >
                Choose File
              </Button>
            </label> */}
            {/* <Button
              variant="contained"
              color="primary"
              // className={classes.button}
              type="submit"
              // disabled={!selectedFile}
            >
              Upload
            </Button> */}
          </form>
        </Grid>

        <Typography variant="h7" gutterBottom>
          Contact Person
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField required id="fullnameContact" name="fullnameContact" label="Name" fullWidth value={formValues.contactName} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField required id="mobileNumContact" name="mobileNumContact" label="Mobile Number" fullWidth value={formValues.contactPNum} onChange={handleChange} variant="standard" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField required id="addressContact" name="addressContact" label="Home Address" fullWidth value={formValues.contactAdd} onChange={handleChange} variant="standard" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentForm;
