import { Grid, Modal, Button } from "@mui/material/";
import React from "react";
import axios from "axios";

import IssueDocTable from "../components/IssueDoc/IssueDocTable";

const IssueDoc = (userDetails) => {
  const user = userDetails.user;
  const [docRequest, setDocRequest] = React.useState([]);
  const [contractAddress, setContractAddress] = React.useState([]);

  const getDocRequestList = async () => {
    try {
      const userCollege = user.college;
      const docListUrl = `${process.env.REACT_APP_API_URL}/issue-document/${userCollege}`;
      const { data } = await axios.get(docListUrl, { withCredentials: true });
      // console.log(data);
      setDocRequest(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getContract = async () => {
    try {
      const contractList = `${process.env.REACT_APP_API_URL}/admin/contract`;
      const { data } = await axios.get(contractList, { withCredentials: true });
      // console.log(data[0].address);
      setContractAddress(data[0].address);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDocRequestList();
    getContract();
  });

  const deployContract = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/deploy`)
      .then((response) => {
        console.log("Data saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <Grid container fullWidth>
      <Grid item xs={12} md={7} xl={8}>
        {/* Document Request */}
        {contractAddress}
      </Grid>
      <Grid item xs={12} md={5} xl={4} sx={{ py: 4, display: "flex", alignItems: "center" }}>
        <Button fullWidth disabled="true" variant="contained" size="large" onClick={deployContract} sx={{ mx: 5 }}>
          Deploy Contract
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <IssueDocTable docRequest={docRequest} user={user} />
      </Grid>
    </Grid>
  );
};

export default IssueDoc;
