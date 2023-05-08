import { Container, Box, Grid, Button, Paper, Modal } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import axios from "axios";

import FormModal from "../components/DocRequest/FormModal";
import DocumentForm from "../components/DocRequest/DocumentForm";

const DocRequest = (userDetails) => {
  const user = userDetails.user;

  const [open, setOpen] = React.useState(false);



  const [docs, setDocs] = React.useState(null);

  const getDocs = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/docName/`;
      const { data } = await axios.get(url, { withCredentials: true });
      setDocs(data);
      // console.log(data);
      console.log(docs);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDocs();
  }, []);

    const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("docs doc request: "+docs)

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
            {" "}
            1
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
              <Button
                startIcon={<AddIcon />}
                fullWidth
                variant="contained"
                size="large"
                onClick={handleOpen}
              >
                New Document Request
              </Button>
            </Box>
            <Modal open={open} onClose={handleClose}>
              <FormModal user={user} docs={docs} onClose={handleClose}/>
              {/* <Paper>hatdog</Paper> */}
            </Modal>
          </Grid>
          <Grid item xs={12} sx={{}}>
            {/* <DocumentForm /> */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DocRequest;
