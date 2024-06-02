const { Transaction, BankAccount, Bank } = require('../models');
const { Op } = require('sequelize');

const getTransactionsByUserId = async (req, res) => {
    const userId = req.params.userId;
    const { type, minAmount, maxAmount, duration, bankId } = req.query;
  
    let dateRange = {};
    if (duration) {
      const now = new Date();
      if (duration === '1months') {
        dateRange = { [Op.gte]: new Date(now.setMonth(now.getMonth() - 1)) };
      } else if (duration === '3months') {
        dateRange = { [Op.gte]: new Date(now.setMonth(now.getMonth() - 3)) };
      } else if (duration === '6months') {
        dateRange = { [Op.gte]: new Date(now.setMonth(now.getMonth() - 6)) };
      }
    }
  
    try {
      let whereClause = { user_id: userId };
      if (type) whereClause.transaction_type = type;
  
      if (minAmount && maxAmount) {
        whereClause.amount = {
          [Op.between]: [parseFloat(minAmount), parseFloat(maxAmount)]
        };
      } else if (minAmount) {
        whereClause.amount = { [Op.gte]: parseFloat(minAmount) };
      } else if (maxAmount) {
        whereClause.amount = { [Op.lte]: parseFloat(maxAmount) };
      }
  
      if (duration) whereClause.transaction_date = dateRange;
  
      const bankAccountWhereClause = {};
      if (bankId) {
        bankAccountWhereClause['bank_id'] = bankId;
      }
  
      const transactions = await Transaction.findAll({
        where: whereClause,
        include: [{
          model: BankAccount,
          where: bankAccountWhereClause,
          attributes: ['account_number'],
          include: [{
            model: Bank,
            attributes: ['bankname']
          }]
        }]
      });
  
      const formattedTransactions = transactions.map(transaction => ({
        transaction_id: transaction.transaction_id,
        transaction_type: transaction.transaction_type,
        amount: transaction.amount,
        other_account: transaction.other_account,
        account_number: transaction.BankAccount.account_number,
        bank_name: transaction.BankAccount.Bank.bankname,
        transaction_date: transaction.transaction_date
      }));
  
      res.json(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  };

  module.exports = {
    getTransactionsByUserId,
  };