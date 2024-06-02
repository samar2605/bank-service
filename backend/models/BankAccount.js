module.exports = (sequelize, DataTypes) => {
    const BankAccount = sequelize.define("BankAccount", {
      account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_number: {
        type: DataTypes.STRING,
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
        references: {
          model: 'Users',
          key: 'user_id',
        },
        allowNull: false,
      },
      bank_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Banks',
          key: 'bank_id',
        },
        allowNull: false,
      },
    });
  
    BankAccount.associate = models => {
      BankAccount.belongsTo(models.User, { foreignKey: 'user_id' });
      BankAccount.belongsTo(models.Bank, { foreignKey: 'bank_id' });
    };
  
    return BankAccount;
  };
  