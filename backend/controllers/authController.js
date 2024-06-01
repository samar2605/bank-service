const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../models");


const signUp = async (req, res) => {
    const { firstname, lastname, email,username, password } = req.body;
    console.log('Api called');
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstname,lastname,email,username, password: hashedPassword });
    console.log('Api called enter');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log('Api called error');
    res.status(500).json({ error: "Error creating user" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email:email } });
    if (!user) res.json({ error: "User Doesn't Exist" });

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const accessToken = jwt.sign({username:user.username, user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token:accessToken,username:user.username, user_id:user.user_id });
    console.log("signin success");
  } catch (error) {
    console.log("signin error");
    res.status(500).json({ error: 'Error signing in' });
  }
};

module.exports = { signUp, signIn };
