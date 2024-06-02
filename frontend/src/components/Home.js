import React, { useState, useEffect } from "react";
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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const Home = ({ authState }) => {
  const [accounts, setAccounts] = useState([]);
  const [showAccounts, setShowAccounts] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    minAmount: "",
    maxAmount: "",
    duration: "",
    bankId: "",
  });
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/banks/user/${authState.id}`
        );
        setBanks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, [authState.id]);

  const handleMyAccounts = async () => {
    try {
      const response = await axios.get(`${API_URL}/banks/user/${authState.id}`);
      console.log(response.data);
      setAccounts(response.data);
      setShowAccounts(true);
      setShowTransactions(false);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleViewTransactions = async () => {
    try {
      const { type, minAmount, maxAmount, duration, bankId } = filters;
      const response = await axios.get(
        `${API_URL}/transactions/user/${authState.id}`,
        {
          params: { type, minAmount, maxAmount, duration, bankId },
        }
      );
      setTransactions(response.data);
      setShowTransactions(true);
      setShowAccounts(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
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
              {showTransactions && (
                <>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="credit">Credit</MenuItem>
                      <MenuItem value="debit">Debit</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Min Amount"
                    name="minAmount"
                    type="number"
                    value={filters.minAmount}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Max Amount"
                    name="maxAmount"
                    type="number"
                    value={filters.maxAmount}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Duration</InputLabel>
                    <Select
                      name="duration"
                      value={filters.duration}
                      onChange={handleFilterChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1months">Last 1 Month</MenuItem>
                      <MenuItem value="3months">Last 3 Months</MenuItem>
                      <MenuItem value="6months">Last 6 Months</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Bank</InputLabel>
                    <Select
                      name="bankId"
                      value={filters.bankId}
                      onChange={handleFilterChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {banks.map((bank) => (
                        <MenuItem key={bank.bank_id} value={bank.bank_id}>
                          {bank.bankname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
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
                <TableRow key={account.bank_id}>
                  <TableCell>{account.bankname}</TableCell>
                  <TableCell>{account.bank_branch}</TableCell>
                  <TableCell>{account.ifsc_code}</TableCell>
                  <TableCell>{account.account_number}</TableCell>
                  <TableCell>{account.account_type}</TableCell>
                  <TableCell>{account.balance}</TableCell>
                </TableRow>
              ))}
              {accounts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="body1" style={{ marginTop: "1rem" }}>
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>
      )}
      {showTransactions && (
        <Container style={{ marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Transactions
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Transaction ID
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Account Number
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Bank Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Transaction Type
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Other Account
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Transaction Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell>{transaction.transaction_id}</TableCell>
                  <TableCell>{transaction.account_number}</TableCell>
                  <TableCell>{transaction.bank_name}</TableCell>
                  <TableCell>{transaction.transaction_type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.other_account}</TableCell>
                  <TableCell>
                    {new Date(transaction.transaction_date).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="body1" style={{ marginTop: "1rem" }}>
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>
      )}
    </Container>
  );
};

export default Home;
