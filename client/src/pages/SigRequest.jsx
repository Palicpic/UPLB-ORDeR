import { Grid, Button, Modal } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import axios from "axios";

import FormModalSignature from "../components/SigRequest/FormModalSignature";
import SigRequestTable from "../components/SigRequest/SigRequestTable";

const SigRequest = (userDetails) => {
  const user = userDetails.user;
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    recipient: "",
    subject: "",
    message: "",
    pdfFile: null,
    userId: user._id,
  });
  const [signRequest, setSignRequest] = React.useState([]);

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

  const getSignRequestList = async () => {
    try {
      const userId = user._id;
      const signListUrl = `${process.env.REACT_APP_API_URL}/signature-request/${userId}`;
      const { data } = await axios.get(signListUrl, { withCredentials: true });
      setSignRequest(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getSignRequestList();
  });

  return (
    <Grid container fullWidth>
      <Grid item xs={12} md={7} xl={8}>
        {/* Document Request */}
      </Grid>
      <Grid item xs={12} md={5} xl={4} sx={{ py: 4, display: "flex", alignItems: "center" }}>
        <Button startIcon={<AddIcon />} fullWidth variant="contained" size="large" onClick={handleOpen} sx={{ mx: 5 }}>
          New Signature Request
        </Button>
        <Modal open={open} onClose={handleClose}>
          <FormModalSignature user={user} onClose={handleClose} formValues={formValues} handleChange={handleChange} handleFileChange={handleFileChange} />
        </Modal>
      </Grid>
      {/* <Grid></Grid> */}
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <SigRequestTable signRequest={signRequest} />
      </Grid>
    </Grid>
  );
};

export default SigRequest;
