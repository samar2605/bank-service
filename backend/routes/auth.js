const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/authController");
const { User } = require("../models");
const { validateToken } = require("../middleware/authMiddleware");


router.get("/", async (req, res) => {
  const listOfUsers = await User.findAll();
  res.json(listOfUsers);
});

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    await User.create(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/signup", signUp);
router.post("/signin", signIn);


router.get("/validate", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
