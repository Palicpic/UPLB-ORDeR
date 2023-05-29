import React, { useState } from "react";
import axios from "axios";

import { Table, TableCell, TableHead, TableRow, Button, Typography, Grid, Container, Box, CircularProgress, Snackbar, Alert, Link } from "@mui/material/";

const columns = [
  { id: "link", label: "Document Link", width: "40%" },
  { id: "student", label: "Requested by", width: "20%" },
  { id: "ocs", label: "Issued by", width: "20%" },
  { id: "signee", label: "Signed By", width: "20%" },
];

const BlockchainData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [rows, setRows] = useState([]);

  const handleAlert = (type, message) => {
    setSeverity(type);
    setAlert(true);
    setAlertMessage(message);
    setIsLoading(false);
  };

  const handleShowDocuments = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/contract/documents`);
      if (data.data) {
        setRows(data.documents);
        setIsLoading(false);
        handleAlert("success", "Getting Documents Success!");
      }
    } catch (err) {
      if (err.response.data.dataError.message) handleAlert("error", err.response.data.dataError.message);
      else handleAlert("error", err.response.data.dataError);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box px={2} pt={2} overflow="auto">
        <Grid container alignItems="center">
          <Grid item xs={12} md={12}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              Document's Data saved on Ethereum Blockchain
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            {!isLoading && (
              <Button fullWidth variant="contained" onClick={handleShowDocuments} sx={{ borderRadius: "40px", boxShadow: 4, m: 1 }}>
                Show Documents
              </Button>
            )}

            {isLoading && (
              <Box sx={{ m: 1, position: "relative", width: "100%" }}>
                <Button variant="contained" disabled={isLoading} fullWidth sx={{ borderRadius: "40px" }}>
                  Getting data ...
                </Button>
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary.main",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box overflow="auto" height="60vh">
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={"center"} sx={{ p: 1, width: column.width, fontSize: 16 }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align={"center"}>
                  <Link href={`https://ipfs.io/ipfs/${row.documentHash}`} target="_blank" rel="noopener noreferrer">
                    https://ipfs.io/ipfs/{row.documentHash}
                  </Link>
                </TableCell>
                <TableCell align={"center"}>{row.studentEmail}</TableCell>
                <TableCell align={"center"}>{row.issuer}</TableCell>
                <TableCell align={"center"}>
                  {row.signatureEmails.map((email) => (
                    <Typography>{email}</Typography>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
            <Alert elevation={6} variant="filled" onClose={() => setAlert(false)} severity={severity}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

export default BlockchainData;
