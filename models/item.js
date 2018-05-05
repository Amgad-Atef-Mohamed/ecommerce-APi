"use strict";

module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define("item", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true ,
        autoIncrement: true
      },
      name :{
        type: DataTypes.STRING,
        allowNull:false
      },
      description : {
        type:DataTypes.TEXT,
        allowNull : false
      },
      price : {
        type:DataTypes.FLOAT,
        allowNull : false
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
      }
    },
    {
      timestamps: false,
      freezeTableName:true,
      tableName: 'item'
    }, {
      classMethods: {
        associate: function(models) {
        }
      }
    });
  item.associate = function(models) {
    item.belongsToMany(models.customer, {
      onDelete: "CASCADE",
      foreignKey:  'item_id',
      otherKey: 'customer_id',
      through: 'cart',
      as :'cart2'
    });
  };
  return item;
};
