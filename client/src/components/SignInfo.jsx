import { Box, Typography, Grid, Link } from "@mui/material/";

import StudentData from "./StudentData";

const SignDocumentForm = (props) => {
  const rowData = props.rowData;
  const filepath = `${process.env.REACT_APP_API_URL}/${rowData.pdfFile.path}`;

  return (
    <Box sx={{ px: 4, pt: 3 }}>
      <Grid item xs={12} sm={6}>
        <Typography>
          <strong>Date Requested: </strong> {rowData.createdAt.toString().replace(/T/, " ").replace(/\..+/, "")}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography>
          <strong>Status: </strong> {rowData.status}
        </Typography>
      </Grid>
      {rowData.status === "Denied" && (
        <Grid item xs={12} sm={12}>
          <Typography>
            <strong>Reason: </strong> {rowData.reasonForRejecting}
          </Typography>
        </Grid>
      )}
      {!props.student && (
        <>
          <Typography variant="h6" sx={{ pt: 1 }}>
            Requested by:
          </Typography>

          <StudentData rowData={rowData.user} />
        </>
      )}

      <Typography variant="h6" sx={{ pt: 3 }}>
        Signature Request Information
      </Typography>

      <Grid container spacing={1} sx={{ pt: 1, px: 2 }}>
        {props.student && (
          <Grid item xs={12} sm={12}>
            <Typography>
              <strong>Recipient: </strong> {rowData.recipient.name.displayName} ({rowData.recipient.email})
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          <Typography>
            <strong>Subject: </strong> {rowData.subject}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography>
            <strong>Message: </strong> {rowData.message}
          </Typography>
        </Grid>
        {(rowData.status === "Pending" || rowData.status === "Denied") && (
          <Grid item xs={12} sm={12}>
            <strong>File: </strong>
            <Link href={filepath} target="_blank" rel="noopener noreferrer">
              {filepath}
            </Link>
            <iframe
              src={filepath}
              style={{
                width: "100%",
                height: "600px",
                border: "none",
              }}
              title="PDF Viewer"
            />
          </Grid>
        )}
        {rowData.status === "Signed" && (
          <>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Date Signed: </strong> {rowData.dateSigned.toString().replace(/T/, " ").replace(/\..+/, "")}
              </Typography>
            </Grid>
            <Grid container spacing={1} sx={{ pt: 2, px: 1 }}>
              <Grid item xs={12} sm={12}>
                <Typography>
                  <strong>The document is stored in IPFS and Ethereum Blockchain to ensure Document's Authenticity and Signatures</strong>
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
                  <iframe
                    src={`https://ipfs.io/ipfs/${rowData.documentHash}`}
                    style={{
                      width: "100%",
                      height: "650px",
                      border: "none",
                    }}
                    title="PDF Viewer"
                  />
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SignDocumentForm;
