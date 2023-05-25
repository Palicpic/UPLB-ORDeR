import { Container, Box, Paper, Typography } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import DocumentRequestForm from "./Form.DocumentRequest";

const DocumentRequestModal = (props) => {
  const formValues = props.formValues;

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Container disableGutters maxWidth="lg" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage: "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: "40px",
          backdropFilter: "blur(50px)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: "7px",
            mr: "13px",
          }}
        >
          <CloseIcon fontSize="medium" color="primary" cursor="pointer" onClick={handleClose} />
        </Box>
        <Typography variant="h4" align="center" sx={{ color: "primary.main", pt: "5px", fontWeight: "medium" }}>
          New Document Request
        </Typography>
        <DocumentRequestForm formValues={formValues} handleChange={props.handleChange} handleClose={props.onClose} getDocRequestList={props.getDocRequestList} setSuccessAlert={props.setSuccessAlert} />
      </Paper>
    </Container>
  );
};

export default DocumentRequestModal;
