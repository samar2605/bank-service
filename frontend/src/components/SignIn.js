import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

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
    marginBottom: '5rem',
  },
}));

const SignIn = ({ setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
      setToken(response.data.token);
      setError('');
    } catch (err) {
        console.log(err);
      setError('Invalid email or password');
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

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
