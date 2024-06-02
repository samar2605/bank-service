const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Transaction} = require('../models');
const { getTransactionsByUserId } = require("../controllers/transactionController");

router.get("/user/:userId", getTransactionsByUserId);

router.post("/", async (req, res) => {
  const transaction = req.body;
  console.log(transaction);
  try {
    await Transaction.create(transaction);
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction" });
  }
});

module.exports = router;
