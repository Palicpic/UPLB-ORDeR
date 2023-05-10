import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Homepage from "./pages/Homepage";
import DocRequest from "./pages/DocRequest";
import SigRequest from "./pages/SigRequest";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";

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
  // console.log(user);

  return (
    <div className="App">
      <CssBaseline />
      <Navbar user={user} />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate to="/doc-request" /> : <Homepage />}
          // element={<Homepage/>}
        />
        <Route exact path="doc-request" element={user ? <DocRequest user={user} /> : <Navigate to="/" />}>
          {/* <Route
          path="form"
          element={user? <DocRequestForm user={user}/> : <Navigate to="/" /> }
          /> */}
        </Route>
        <Route
          exact
          path="/signature-request"
          // element={user? <DocRequest user={user}/>  : <Navigate to="/" />
          element={user ? <SigRequest user={user} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
