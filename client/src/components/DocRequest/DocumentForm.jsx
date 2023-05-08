import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material/";

const DocumentForm = (props) => {
  const docs = props.docs;

  const sems = [
    "All semesters enrolled",
    "1st Semester",
    "2nd Semester",
    "Midterm",
  ];
  const reason = [
    "Extension",
    "Medical/Law School",
    "Scholarship",
    "Readmission",
    "Graduate Study",
    "Student Org Recognition",
    "Job Application/OJT",
    "Reinstatement",
    "Transfer/Shift",
    "Others",
  ];
  const classification = ["Freshman", "Sophomore", "Junior", "Senior"];

  return (
    <Box sx={{ px: 8 }}>
      <Typography variant="h6" gutterBottom>
        Document Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="docname">Document Request</InputLabel>
            <Select
              labelId="select-doc-label"
              id="select-doc"
              value=""
              label="Document Request*"
              // onChange={handleChange}
            >
              {docs.map((doc) => (
                <MenuItem key={doc.name} value={doc.name}>
                  <Typography>{doc.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            type="number"
            id="copies"
            name="copies"
            label="Number of Copies"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
            inputProps={{
              min: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="semester">Semester</InputLabel>
            <Select
              labelId="select-semester-label"
              id="select-semester"
              value=""
              label="Semester*"
              // onChange={handleChange}
            >
              {sems.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="acadyear"
            name="acadyear"
            label="Academic Year (20xx-20xx)"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Other"
            name="Other"
            label="Other"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="reason">Reason for Requesting</InputLabel>
            <Select
              labelId="select-reason-label"
              id="select-reason"
              value=""
              label="Reason for Requesting*"
              // onChange={handleChange}
            >
              {reason.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="reason-text"
            name="reason-text"
            label="Other Reason (Please Specify)"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="fullname"
            name="fullname"
            label="Name"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="studnum"
            name="studnum"
            label="Student Number"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="saisnum"
            name="saisnum"
            label="SAIS Number"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="degProg"
            name="degProg"
            label="Degree Program"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="adviser"
            name="adviser"
            label="Adviser"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobileNum"
            name="mobileNum"
            label="Mobile Number"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Home Address"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="standard">
            <InputLabel id="classification">Classification</InputLabel>
            <Select
              labelId="select-classification-label"
              id="select-classification"
              value=""
              label="Classification*"
              // onChange={handleChange}
            >
              {classification.map((i) => (
                <MenuItem key={i} value={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>

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
            <TextField
              required
              id="fullnameContact"
              name="fullnameContact"
              label="Name"
              fullWidth
              // autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="mobileNumContact"
              name="mobileNumContact"
              label="Mobile Number"
              fullWidth
              // autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="addressContact"
              name="addressContact"
              label="Home Address"
              fullWidth
              // autoComplete="family-name"
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentForm;
