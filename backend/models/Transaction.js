module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    transaction_id: {
      type: DataTypes.STRING(12), 
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{12}$/ 
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    other_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Transaction.associate = models => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id',targetKey:'user_id' });
    Transaction.belongsTo(models.BankAccount, { foreignKey: 'account_id',targetKey:'account_id'});
  };

  return Transaction;
};
