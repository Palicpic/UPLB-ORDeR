import { Grid, Button, Modal } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import axios from "axios";

import FormModal from "../components/DocRequest/FormModal";
import DocRequestTable from "../components/DocRequest/DocRequestTable";

//Document Request page for student
const DocRequest = (props) => {
  const user = props.user;
  const [open, setOpen] = React.useState(false);
  const [docs, setDocs] = React.useState([]);
  const [colleges, setColleges] = React.useState([]);
  const [docRequest, setDocRequest] = React.useState([]);

  const [formValues, setFormValues] = React.useState({
    documentName: "",
    semester: "",
    acadYear: "",
    otherDocName: "",
    reason: "",
    otherReason: "",
    email: user.email,
    displayName: user.displayName,
    name: {
      firstName: user.name.firstName,
      middleName: user.name.middleName ? user.name.middleName : "",
      lastName: user.name.lastName,
      displayName: user.name.displayName,
    },
    college: user.college ? user.college : "",
    studNum: user.student ? user.student.studNum : null,
    saisNum: user.student ? user.student.saisNum : null,
    degProg: user.student ? user.student.degProg : null,
    adviser: user.student ? user.student.adviser : null,
    mobileNum: user.student ? user.student.mobileNum : null,
    address: user.student ? user.student.address : null,
    classification: user.student ? user.student.classification : "",
    idPic: user.student ? user.student.idPic : null,
    contactName: user.student ? user.student.contactName : null,
    contactPNum: user.student ? user.student.contactPNum : null,
    contactAdd: user.student ? user.student.contactAdd : null,
  });

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

  const getDocRequestList = async () => {
    try {
      const userId = user._id;
      const docListUrl = `${process.env.REACT_APP_API_URL}/document-request/${userId}`;
      const { data } = await axios.get(docListUrl, { withCredentials: true });
      setDocRequest(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDoc();
    getCOlleges();
    getDocRequestList();
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

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <Grid container fullWidth>
      <Grid item xs={12} md={7} xl={8}>
        {/* Document Request */}
      </Grid>
      <Grid item xs={12} md={5} xl={4} sx={{ py: 4, display: "flex", alignItems: "center" }}>
        <Button startIcon={<AddIcon />} fullWidth variant="contained" size="large" onClick={handleOpen} sx={{ mx: 5 }}>
          New Document Request
        </Button>
        <Modal open={open} onClose={handleClose}>
          <FormModal user={user} docs={docs} colleges={colleges} formValues={formValues} onClose={handleClose} handleChange={handleChange} handleFileChange={handleFileChange} />
        </Modal>
      </Grid>
      {/* <Grid></Grid> */}
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <DocRequestTable docRequest={docRequest} />
      </Grid>
    </Grid>
  );
};

export default DocRequest;
