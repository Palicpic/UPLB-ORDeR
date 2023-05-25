import { Box, Typography, Grid, Link } from "@mui/material/";

const DocumentInfo = (props) => {
  const rowData = props.rowData;

  return (
    <Box sx={{ px: { xl: 5, sm: 2, xs: 1 }, pt: 3 }}>
      <Typography variant="h6">Student Information</Typography>

      <Grid container spacing={1} sx={{ pt: 2, px: 2 }}>
        <Grid item xs={12} sm={12}>
          <Typography>
            <strong>Name:</strong> {rowData.user[0].name.displayName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Student Number: </strong> {rowData.user[0].student.number}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Degree Program: </strong> {rowData.user[0].student.degreeProgram}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Email: </strong> {rowData.user[0].email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Mobile Number: </strong> {rowData.user[0].student.mobileNum}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Classification: </strong> {rowData.user[0].student.classification}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>College: </strong> {rowData.user[0].college}
          </Typography>
        </Grid>
      </Grid>

      {rowData.document === "Form 5" && (
        <Grid container spacing={1} sx={{ pt: 1, px: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Sais Number: </strong> {rowData.user[0].student.saisNum}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Adviser: </strong> {rowData.user[0].student.adviser}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography>
              <strong>Address: </strong> {rowData.user[0].student.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ pt: "20px" }}>
            <Typography variant="h7" sx={{ fontWeight: "bold" }}>
              Contact Person
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Name: </strong> {rowData.user[0].student.contactPerson.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Mobile Number: </strong> {rowData.user[0].student.contactPerson.mobileNum}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography>
              <strong>Address: </strong> {rowData.user[0].student.contactPerson.address}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Typography variant="h6" sx={{ pt: 3 }}>
        Document Information
      </Typography>
      <Grid container spacing={1} sx={{ pt: 2, px: 2 }}>
        <Grid item xs={12} sm={12}>
          <Typography>
            <strong>Document Request: </strong> {rowData.document}
          </Typography>
        </Grid>
        {rowData.document === "True Copy of Grades" && (
          <>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Semester: </strong> {rowData.semester}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Academic Year: </strong> {rowData.acadYear}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12}>
          <Typography>
            <strong>Reason for Requesting: </strong> {rowData.reason}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Status: </strong> {rowData.status}
          </Typography>
        </Grid>
        {rowData.status === "Denied" && (
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Reason: </strong> {rowData.reasonForRejecting}
            </Typography>
          </Grid>
        )}
        {rowData.status === "Issued" && (
          <>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Data Issued: </strong> {rowData.dateIssued.toString().replace(/T/, " ").replace(/\..+/, "")}
              </Typography>
            </Grid>
            <Grid container spacing={1} sx={{ pt: 2, px: 1 }}>
              <Grid item xs={12} sm={12}>
                <Typography>
                  <strong>The document is stored in IPFS and Ethereum Blockchain to ensure Document's Authenticity</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>
                  <strong>Transaction Hash: </strong> {rowData.transactionHash}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>
                  <strong>Document Link: </strong>
                  <Link href={`https://ipfs.io/ipfs/${rowData.documentHash}`} target="_blank" rel="noopener noreferrer">
                    https://ipfs.io/ipfs/{rowData.documentHash}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default DocumentInfo;
