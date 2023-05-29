import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { Container, Grid, Typography, Button, Snackbar, Alert, LinearProgress, Box, Link } from "@mui/material/";
import { MainContainer, MainBox } from "../Style";

const VerifyDocument = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [formValues, setFormValues] = useState({
    file: null,
  });

  const onDrop = (acceptedFiles) => {
    setFormValues({ ...formValues, file: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1, accept: "application/pdf" });

  const handleVerify = async () => {
    if (formValues.file === null) {
      setAlert(true);
      setAlertMessage("File Upload is required!");
    } else {
      setIsUploading(true);
      const formData = new FormData();
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          formData.append(key, formValues[key]);
        }
      }
      axios
        .post(`/contract/verify`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          setIsUploading(false);
          setDocumentData(data.data.document);
          setAlert(true);
          setAlertMessage("Document is not tampered!");
        })
        .catch((error) => {
          // Handle error response from the server
          setIsUploading(false);
          setAlert(true);
          if (error.response) {
            setAlertMessage(error.response.data.dataError);
          } else {
            setAlertMessage("An error occurred while verifying the file.");
          }
        });
    }
  };

  return (
    <MainContainer>
      <MainBox>
        <Typography variant="h4" color="primary.main" display="flex" justifyContent="center" sx={{ fontWeight: "bold", pt: 5 }}>
          Verify Document
        </Typography>
        {!documentData && (
          <>
            <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
              <Alert elevation={6} variant="filled" onClose={() => setAlert(false)} severity="error">
                {alertMessage}
              </Alert>
            </Snackbar>
            <Container maxWidth="md" sx={{ height: "65vh", justifyContent: "center", display: "flex", flexDirection: "column" }}>
              <Grid container alignItems="center" display="flex" height="50%">
                <Grid item sm={12} lg={12} justifyContent="center" display="flex" height="250px">
                  <div {...getRootProps()} style={{ textAlign: "center", padding: "5rem", border: "2px dashed #aaa", borderRadius: "40px", width: "100%", height: "100%" }}>
                    <input {...getInputProps()} />
                    {formValues.file ? (
                      <Typography>{formValues.file.name}</Typography>
                    ) : (
                      <>
                        {isDragActive ? <p>Drop the PDF file here...</p> : <p>Drag and drop a PDF file here, or click to select a file</p>}
                        <Button color="primary" sx={{ borderRadius: "40px" }}>
                          Select Files
                        </Button>
                      </>
                    )}
                  </div>
                </Grid>
              </Grid>
              {!isUploading && (
                <Grid item sm={12} lg={12} justifyContent="center" display="flex">
                  <Button variant="contained" onClick={handleVerify}>
                    Verify
                  </Button>
                </Grid>
              )}
              {isUploading && (
                <>
                  <LinearProgress />
                  <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                    <Typography variant="h6" color="primary.main">
                      Verifying...
                    </Typography>
                  </Box>
                </>
              )}
            </Container>
          </>
        )}
        {documentData && (
          <Container maxWidth="md" sx={{}}>
            {alert && (
              <Alert open={alert} elevation={6} variant="filled" sx={{ width: "40%", display: "flex", m: "auto", mt: 3 }} onClose={() => setAlert(false)} severity="success">
                {alertMessage}
              </Alert>
            )}

            <Grid item xs={12} sm={12}>
              <Typography variant="h6" sx={{ pt: 3, fontWeight: "bold" }}>
                Document Information
              </Typography>
            </Grid>
            <Grid container display="flex" sx={{ px: 2 }}>
              {documentData.issuerInfo.length !== 0 && (
                <>
                  <Grid item xs={12} sm={12}>
                    <Typography sx={{ pt: 3 }}>
                      <strong>Issued by: </strong> {documentData.issuerInfo}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography sx={{ pt: 3 }}>
                      <strong>Issued to: </strong> {documentData.studentName} ({documentData.studentEmail})
                    </Typography>
                  </Grid>
                </>
              )}
              {Object.keys(documentData.signatureStorage).length !== 0 && (
                <>
                  <Grid item xs={12} sm={12}>
                    <Typography sx={{ pt: 3 }}>
                      <strong>Signed by: </strong>
                    </Typography>
                  </Grid>
                  {Object.entries(documentData.signatureStorage).map(([email, name]) => (
                    <Grid item xs={12} sm={12} sx={{ px: 2 }}>
                      <Typography key={email}>
                        {name} ({email})
                      </Typography>
                    </Grid>
                  ))}
                </>
              )}

              <Grid item xs={12} sm={12}>
                <Typography sx={{ pt: 3 }}>
                  <strong>Document Link: </strong>
                  <Link href={`https://ipfs.io/ipfs/${documentData.fileHash}`} target="_blank" rel="noopener noreferrer">
                    https://ipfs.io/ipfs/{documentData.fileHash}
                  </Link>
                  {!isLoaded && (
                    <>
                      <LinearProgress />
                      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                        <Typography variant="h6" color="primary.main">
                          Document Loading...
                        </Typography>
                      </Box>
                    </>
                  )}
                  <iframe
                    src={`https://ipfs.io/ipfs/${documentData.fileHash}`}
                    onLoad={() => setIsLoaded(true)}
                    style={{
                      width: "100%",
                      height: "90vh",
                      border: "none",
                    }}
                    title="PDF Viewer"
                  />
                </Typography>
              </Grid>
            </Grid>
          </Container>
        )}
      </MainBox>
    </MainContainer>
  );
};

export default VerifyDocument;
