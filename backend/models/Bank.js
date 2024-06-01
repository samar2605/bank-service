module.exports = (sequelize, DataTypes) => {
    const Bank = sequelize.define("Bank", {
      user_id: {
        type: DataTypes.INTEGER,
      },
      bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
       },
      bankname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ifsc_code:{
        type: DataTypes.STRING,
        allowNull:false,
      }
    });
  
    return Bank;
  };
  