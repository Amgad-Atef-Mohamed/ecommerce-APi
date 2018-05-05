"use strict";

module.exports = function(sequelize, DataTypes) {
  var cart = sequelize.define("cart", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      item_id : {
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        references: {
          model: "item",
          key: "id",
        }
      },
      customer_id : {
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        references: {
          model: "customer",
          key: "id"
        }
      },
      quantity : {
        type:DataTypes.INTEGER,
        allowNull : false,
      },
      created_at : {
        type: 'TIMESTAMP' ,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at :{
        type: 'TIMESTAMP' ,
        allowNull: false,
        defaultValue: sequelize.NOW
      },

    },
    {
      timestamps: false,
      freezeTableName:true,
      tableName: 'cart'
    }, {
      classMethods: {
      }
    });
  return cart;
};
