import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/validate`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.user_id,
            status: true,
          });
        }
      });
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <NavBar authState={authState} setAuthState={setAuthState} />
        <div style={{ paddingTop: "5rem" }}></div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home authState={authState} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
