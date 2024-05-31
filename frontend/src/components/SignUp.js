import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '10rem',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formElement: {
    marginBottom:'5rem',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${API_URL}/auth/signup`, { firstname: firstName, lastname: lastName, email, username, password });
      setSuccess('Sign up successful! Please sign in.');
      setError('');
    } catch (err) {
      setError('Error signing up, please try again.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            className={classes.formElement}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
                          {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}


          <Button variant="contained" color="primary" className={classes.formElement} type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
