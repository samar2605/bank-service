const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());

const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Database configuration
const { Sequelize } = require('sequelize');

//for local
// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT,
// });

const sequelize = new Sequelize(process.env.MYSQL_URL, {dialect:"mysql",logging: console.log} );

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./models/User')(sequelize, Sequelize.DataTypes);
db.Bank = require('./models/Bank')(sequelize, Sequelize.DataTypes);
db.BankAccount = require('./models/BankAccount')(sequelize, Sequelize.DataTypes);
db.Transaction = require('./models/Transaction')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const bankRoutes = require('./routes/banks');
app.use('/api/banks', bankRoutes);

const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);
// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
  });
}).catch(err => console.log(err));
