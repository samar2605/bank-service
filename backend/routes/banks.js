const express = require("express");
const { getBanksByUserId } = require("../controllers/banksController");
const router = express.Router();
const { Bank, BankAccount } = require("../models");

router.get("/user/:userId", getBanksByUserId);

router.post("/", async (req, res) => {
  const bank = req.body;
  try {
    await Bank.create(bank);
    res.status(201).json({ message: "Bank created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating bank" });
  }
});

router.post("/account", async (req, res) => {
  const bankAccount = req.body;
  try {
    await BankAccount.create(bankAccount);
    res.status(201).json({ message: "Bank account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating bank account" });
  }
});
module.exports = router;
