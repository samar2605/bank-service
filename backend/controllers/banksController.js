const { Bank, BankAccount } = require('../models');

const getBanksByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const bankAccounts = await BankAccount.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Bank,
          attributes: ['bank_id', 'bankname', 'bank_branch', 'ifsc_code']
        }
      ]
    });

    const result = bankAccounts.map(account => ({
      bank_id: account.Bank.bank_id,
      bankname: account.Bank.bankname,
      bank_branch: account.Bank.bank_branch,
      ifsc_code: account.Bank.ifsc_code,
      account_number: account.account_number,
      account_type: account.account_type,
      balance: account.balance,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bank accounts' });
  }
};

module.exports = {
  getBanksByUserId,
};
