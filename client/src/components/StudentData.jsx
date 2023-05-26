import { Typography, Grid } from "@mui/material/";

const StudentData = (props) => {
  const rowData = props.rowData;
  return (
    <Grid container spacing={1} sx={{ pt: 2, px: 2 }}>
      <Grid item xs={12} sm={12}>
        <Typography>
          <strong>Name:</strong> {rowData.name.displayName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Student Number: </strong> {rowData.student.number}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Degree Program: </strong> {rowData.student.degreeProgram}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Email: </strong> {rowData.email}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Mobile Number: </strong> {rowData.student.mobileNum}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Classification: </strong> {rowData.student.classification}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>College: </strong> {rowData.college}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StudentData;
