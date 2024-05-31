const express = require('express')
const app = express()
require('dotenv').config();
const cors = require("cors")

app.use(express.json());
app.use(cors());

// Database configuration (assuming you have Sequelize setup)
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// const db = require("./models");
const port = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
}).catch(err => console.log(err));;

  // app.listen(port, () => {
  //   console.log(`Server running on port ${port}`);
  // });
