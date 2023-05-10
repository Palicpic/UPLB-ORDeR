import { Container, Box, Grid, Button, Paper, Modal } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import axios from "axios";

import FormModal from "../components/DocRequest/FormModal";

//Document Request page for student
const DocRequest = (userDetails) => {
  const user = userDetails.user;
  const [open, setOpen] = React.useState(false);
  const [docs, setDocs] = React.useState(null);
  const [colleges, setColleges] = React.useState(null);

  const [formValues, setFormValues] = React.useState({
    documentName: "",
    semester: "",
    acadYear: "",
    otherDocName: "",
    reason: "",
    otherReason: "",
    email: user.email,
    displayName: user.displayName,
    college: user.college ? user.college : null,
    studNum: user.student ? user.student.studNum : null,
    saisNum: user.student ? user.student.saisNum : null,
    degProg: user.student ? user.student.degProg : null,
    adviser: user.student ? user.student.adviser : null,
    mobileNum: user.student ? user.student.mobileNum : null,
    address: user.student ? user.student.address : null,
    classification: user.student ? user.student.classification : null,
    idPic: user.student ? user.student.idPic : null,
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
  };

  //get the list of all documents for dropdown menu
  const getDoc = async () => {
    try {
      const docUrl = `${process.env.REACT_APP_API_URL}/docName/`;
      const { data } = await axios.get(docUrl, { withCredentials: true });
      setDocs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCOlleges = async () => {
    try {
      const collegeUrl = `${process.env.REACT_APP_API_URL}/college/`;
      const { data } = await axios.get(collegeUrl, { withCredentials: true });
      setColleges(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDoc();
    getCOlleges();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={5}
        maxWidth="xl"
        sx={{
          bgcolor: "white",
          height: "93vh",
          m: "auto",
          borderRadius: "50px",
          boxShadow: "1px 1px 1px 0px #963c55, 1px 1px 1px 1px #aa4360",
        }}
      >
        <Grid container maxWidth="xl" spacing={3} sx={{ m: 0, p: 0 }}>
          <Grid item xs={12} md={8} xl={9} sx={{}}>
            {/* TODO text title */}
          </Grid>
          <Grid item xs={12} md={4} xl={3} sx={{ p: 2 }}>
            <Box
              sx={{
                my: 2,
                mr: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button startIcon={<AddIcon />} fullWidth variant="contained" size="large" onClick={handleOpen}>
                New Document Request
              </Button>
            </Box>
            <Modal open={open} onClose={handleClose}>
              <FormModal user={user} docs={docs} colleges={colleges} formValues={formValues} onClose={handleClose} handleChange={handleChange} handleFileChange={handleFileChange} />
            </Modal>
          </Grid>
          <Grid item xs={12} sx={{}}>
            {/* TODO Table */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DocRequest;
