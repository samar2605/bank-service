module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define("Bank", {
    bank_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bankname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bank_branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ifsc_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Bank.associate = models => {
    Bank.hasMany(models.BankAccount, { foreignKey: 'bank_id'});
  };

  return Bank;
};
