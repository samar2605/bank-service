// frontend/src/components/Home.js
import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const Home = () => {
  const handleMyAccounts = async () => {
    try {
      const response = await axios.get(`${API_URL}/banks`);
      console.log('My Accounts:', response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleViewTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      console.log('Transactions:', response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Banking Service
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                My Accounts
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View your bank accounts and their balances.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleMyAccounts}
                style={{ marginTop: '1rem' }}
              >
                View Accounts
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                View Transactions
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View your transaction history.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleViewTransactions}
                style={{ marginTop: '1rem' }}
              >
                View Transactions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
