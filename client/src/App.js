import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { CssBaseline } from "@mui/material";

import NavBar from "./components/Navbar";
//Pages
import HomePage from "./pages/Homepage";
import DocumentRequest from "./pages/DocumentRequest";
import SignatureRequest from "./pages/SignatureRequest";
import IssueDocument from "./pages/IssueDocument";
import SignDocument from "./pages/SignDocument";
import VerifyDocument from "./pages/VerifyDocument";
import AdminPage from "./pages/AdminPage";

export const UserContext = createContext();

const renderHomePage = (role) => {
  switch (role) {
    case "Admin":
      return <Navigate to="/admin" />;
    case "Student":
      return <Navigate to="/document-request" />;
    case "Faculty":
      return <Navigate to="/sign-document" />;
    case "OCS Staff":
      return <Navigate to="/issue-document" />;
    default:
      return <HomePage />;
  }
};

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
      <UserContext.Provider value={user}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={user ? renderHomePage(user.role) : <HomePage />} />
          <Route exact path="/document-request" element={user ? <DocumentRequest /> : <Navigate to="/" />} />
          <Route exact path="/signature-request" element={user ? <SignatureRequest /> : <Navigate to="/" />} />
          <Route exact path="/issue-document" element={user ? <IssueDocument /> : <Navigate to="/" />} />
          <Route exact path="/sign-document" element={user ? <SignDocument /> : <Navigate to="/" />} />
          <Route exact path="/admin" element={user ? <AdminPage /> : <Navigate to="/" />} />
          <Route exact path="/verify-document" element={<VerifyDocument />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
