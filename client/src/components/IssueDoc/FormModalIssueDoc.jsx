import React from "react";
import { Container, Box, Paper, Typography, Button, TextField, LinearProgress } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const FormModalIssueDoc = (props) => {
  const row = props.rowData;
  const [formValues, setFormValues] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log("submit");
    setIsUploading(true);

    // const docUrl = `${process.env.REACT_APP_API_URL}/api/documents/new`;
    //   const { data } = await axios.post(docUrl, formData);
  };

  return (
    <Container disableGutters maxWidth="lg" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage: "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          height: "90vh",
          overflow: "auto",
          mt: "70px",
          borderRadius: "25px",
          backdropFilter: "blur(50px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: "5px",
            mr: "10px",
          }}
        >
          <CloseIcon fontSize="medium" color="primary" cursor="pointer" onClick={handleClose} />
        </Box>
        {row.documentName}
        <TextField id="file-input" name="studentFile" accept=".pdf" variant="outlined" type="file" required onChange={handleFileChange} />
        {isUploading === false && (
          <Button variant="contained" endIcon={<SendIcon />} type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {isUploading && <LinearProgress />}
      </Paper>
    </Container>
  );
};

export default FormModalIssueDoc;
