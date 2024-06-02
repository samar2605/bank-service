const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Transaction} = require('../models');
const { getTransactionsByUserId } = require("../controllers/transactionController");

router.get("/user/:userId", getTransactionsByUserId);

// router.post("/", async (req, res) => {
//   const transaction = req.body;
//   console.log(transaction);
//   try {
//     await Transaction.create(transaction);
//     res.status(201).json({ message: "Transaction created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating transaction" });
//   }
// });
router.post("/", async (req, res) => {
    const transactions = req.body;
  
    if (!Array.isArray(transactions)) {
      return res.status(400).json({ error: "Request body must be an array of transactions" });
    }
  
    try {
      await Transaction.bulkCreate(transactions);
      res.status(201).json({ message: "Transactions created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating transactions" });
    }
  });
  
module.exports = router;
