module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define("BankAccount", {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    bank_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'banks',
        key: 'bank_id',
      },
    },
  });

  BankAccount.associate = models => {
    BankAccount.belongsTo(models.User, { foreignKey: 'user_id',targetKey:'user_id' });
    BankAccount.belongsTo(models.Bank, { foreignKey: 'bank_id', targetKey:'bank_id' });
    BankAccount.hasMany(models.Transaction, { foreignKey: 'account_id'});
  };

  return BankAccount;
};
