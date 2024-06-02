// module.exports = (sequelize, DataTypes) => {
//   const Bank = sequelize.define("Bank", {
//     bank_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     bankname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     balance: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     account_number: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     account_type: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     bank_branch: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     ifsc_code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users', // Name of the table, not the model
//         key: 'user_id'
//       }
//     },
//   });

//   Bank.associate = (models) => {
//     Bank.belongsTo(models.User, {
//       foreignKey: 'user_id',
//       onDelete: 'CASCADE'
//     });
//   };

//   return Bank;
// };
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
    Bank.hasMany(models.BankAccount, { foreignKey: 'bank_id' });
  };

  return Bank;
};
