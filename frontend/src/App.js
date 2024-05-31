import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [listOfPosts, setListOfPosts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/auth").then((response) => {
//       setListOfPosts(response.data);
//     });
//   }, []);
//   return (
//     <div className="App">
//       {listOfPosts.map((value, key) => {
//         return (
//           <div className="post">
//             <div className="footer">{value.username}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
