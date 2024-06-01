module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
      user_id: {
        type: DataTypes.INTEGER,
      },
      bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      transaction_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
      }
      // date_time:{
      //   type:DataTypes.DATETIME,
      // }
    });
  
    return Transaction;
  };
  