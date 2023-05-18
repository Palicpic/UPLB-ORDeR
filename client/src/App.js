import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Paper } from "@mui/material/";
import { useEffect, useState } from "react";
import axios from "axios";

import Homepage from "./pages/Homepage";
import DocRequest from "./pages/DocRequest";
import SigRequest from "./pages/SigRequest";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";
import IssueDoc from "./pages/IssueDoc";

const App = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <Navbar user={user} />
      <Container maxWidth="xl">
        <Paper
          elevation={5}
          sx={{
            bgcolor: "white",
            height: "93vh",
            m: "auto",
            borderRadius: "50px",
            boxShadow: "1px 1px 1px 0px #963c55, 1px 1px 1px 1px #aa4360",
            overflow: "auto",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route exact path="/" element={!user ? <Homepage /> : user.role === "student" ? <Navigate to="/doc-request" /> : user.role === "ocs" ? <Navigate to="/issue-document" /> : <Homepage />} />
            {/* <Route exact path="/" element={user.role === "student" ? <Navigate to="/doc-request" /> : user.role === "ocs" ? <Navigate to="/issue-document" /> : <Homepage />} /> */}
            <Route exact path="doc-request" element={user ? <DocRequest user={user} /> : <Navigate to="/" />}></Route>
            <Route exact path="/signature-request" element={user ? <SigRequest user={user} /> : <Navigate to="/" />} />
            <Route exact path="/issue-document" element={user ? <IssueDoc user={user} /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Paper>
      </Container>
    </div>
  );
};

export default App;
