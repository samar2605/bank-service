import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "4rem",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  formElement: {
    marginBottom: "5rem",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });
      if (response.data.error) {
        alert(response.data.error);
        setError(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            className={classes.formElement}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
