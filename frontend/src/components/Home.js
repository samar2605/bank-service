import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const Home = ({ authState }) => {
  const [accounts, setAccounts] = useState([]);
  const [showAccounts, setShowAccounts] = useState(false);

  const handleMyAccounts = async () => {
    try {
      const response = await axios.get(`${API_URL}/banks/user/${authState.id}`);
      setAccounts(response.data);
      setShowAccounts(true);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleViewTransactions = async () => {
    setShowAccounts(false);
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
                style={{ marginTop: "1rem" }}
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
                style={{ marginTop: "1rem" }}
              >
                View Transactions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {showAccounts && (
        <Container style={{ marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            My Accounts
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Bank Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Bank Branch
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>IFSC Code</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Account Number
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Account Type
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.account_number}>
                  <TableCell>{account.bankname}</TableCell>
                  <TableCell>{account.bank_branch}</TableCell>
                  <TableCell>{account.ifsc_code}</TableCell>
                  <TableCell>{account.account_number}</TableCell>
                  <TableCell>{account.account_type}</TableCell>
                  <TableCell>{account.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      )}
    </Container>
  );
};

export default Home;
