import React, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../App.js";
import axios from "axios";

import { Container, Grid, Button, Typography, Modal, Snackbar, Alert } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import { MainContainer, MainBox } from "../Style";

import DocumentRequestTable from "../components/DocumentRequest/Table.DocumentRequest.jsx";
import DocumentRequestModal from "../components/DocumentRequest/Modal.DocumentRequest.jsx";

const DocumentRequest = () => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [docRequestList, setDocRequestList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);

  const [formValues, setFormValues] = useState({
    email: user.email,
    displayName: user.name.displayName,
    firstName: user.name.firstName,
    middleName: user.name.middleName ? user.name.middleName : "",
    lastName: user.name.lastName,
    college: user.college ? user.college : "",
    number: user.student ? user.student.number : "",
    classification: user.student ? user.student.classification : "",
    saisNum: user.student ? user.student.saisNum : "",
    address: user.student ? user.student.address : "",
    mobileNum: user.student ? user.student.mobileNum : "",
    adviser: user.student ? user.student.adviser : "",
    degreeProgram: user.student ? user.student.degreeProgram : "",
    contactPersonName: user.student ? user.student.contactPerson.name : "",
    contactPersonAddress: user.student ? user.student.contactPerson.address : "",
    contactPersonMobileNum: user.student ? user.student.contactPerson.mobileNum : "",
    documentName: "",
    semester: "",
    acadYear: "",
    otherDocName: "",
    reasonChoice: "",
    otherReason: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const getDocRequestList = useCallback(async () => {
    try {
      const userId = user._id;
      const docListUrl = `${process.env.REACT_APP_API_URL}/document/request/${userId}`;
      const { data } = await axios.get(docListUrl, { withCredentials: true });
      setDocRequestList(data);
    } catch (err) {
      console.log(err);
    }
  }, [user._id]);

  useEffect(() => {
    getDocRequestList();
  }, [getDocRequestList]);

  return (
    <MainContainer>
      <Snackbar open={successAlert} autoHideDuration={6000} onClose={() => setSuccessAlert(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setSuccessAlert(false)} severity="success">
          Successfully Requested a Dococument!
        </Alert>
      </Snackbar>
      <MainBox>
        <Container maxWidth="xl">
          <Grid container sx={{ py: 4 }}>
            <Grid item xs={12} md={8} xl={9}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: "bold" }}>
                Document Request
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
              <Button startIcon={<AddIcon />} fullWidth variant="contained" size="large" onClick={handleOpen} sx={{ borderRadius: "40px", boxShadow: 4, mt: { sm: 1, xs: 1, md: 0, lg: 0, xl: 0 } }}>
                New Document Request
              </Button>
              <Modal open={open} onClose={handleClose}>
                <>
                  <DocumentRequestModal formValues={formValues} onClose={handleClose} handleChange={handleChange} setSuccessAlert={setSuccessAlert} getDocRequestList={getDocRequestList} />
                </>
              </Modal>
            </Grid>
            <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }}>
              <DocumentRequestTable docRequestList={docRequestList} />
            </Grid>
          </Grid>
        </Container>
      </MainBox>
    </MainContainer>
  );
};

export default DocumentRequest;
