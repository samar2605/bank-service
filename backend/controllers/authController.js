const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../models");


const signUp = async (req, res) => {
    const { firstname, lastname, email,username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstname,lastname,email,username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
    return res.status(200).json('Success');
  } catch (error) {
    res.status(500).json({ error: 'Error signing in' });
  }
};

module.exports = { signUp, signIn };
