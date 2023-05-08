import React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";


import DocumentForm from "../DocRequest/DocumentForm";
import PersonalInfoForm from "../DocRequest/PersonalInfoForm";
import Review from "../DocRequest/Review";

const steps = [
  "Document Information",
  "Personal Information",
  "Review Details",
];

const getStepContent = (step, docs) => {
  switch (step) {
    case 0:
      return <DocumentForm docs={docs} />;
    case 1:
      return <PersonalInfoForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
};

const FormModal = (props) => {
  const user = props.user;
  const docs = props.docs;
  const [activeStep, setActiveStep] = React.useState(0);
  

  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  
  

  console.log("docs: "+docs)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

	const handleClose = () => {
    props.onClose();
  };

  return (
    <Container disableGutters maxWidth="lg" sx={{ justifyContent: "center" }}>
      <Paper
        sx={{
          backgroundImage:
            "linear-gradient(171deg, rgba(142,21,55,0.5) 0%, rgba(150,60,85,0.5) 2%, rgba(244,244,244,0.5) 40%)",
          height: "90vh",
          overflow: 'auto',
          mt: "70px",
          borderRadius: "25px",
          backdropFilter: "blur(50px)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: '5px', mr: '10px'}}>
          <CloseIcon fontSize='medium' color="primary" cursor="pointer" onClick={handleClose}/>
        </Box>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ color: "primary.main", pt: "5px", fontWeight: "medium" }}
        >
          New Document Request
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, px: 30 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box></Box>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep, docs)}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {activeStep !== 0 && (
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  size="large"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Back
                </Button>
              )}

              <Button
                endIcon={<ArrowForwardIcon />}
                variant="contained"
                size="large"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
};

export default FormModal;
