"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true ,
        autoIncrement: true
    },
    first_name : {
      type:DataTypes.STRING,
      allowNull: false,
    },
    last_name : {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email : {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    store_credit : {
      type:DataTypes.STRING,
      allowNull: true,
    },
    created_at :{
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
    tableName: 'customer'
  },
  {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  customer.associate = function(models) {
    customer.hasMany(models.order, {
            onDelete: "CASCADE",
            foreignKey:'customer_id',
            sourceKey: 'id',
            as: 'customerOrders'
        });

    customer.belongsToMany(models.item, {
      onDelete: "CASCADE",
      foreignKey:  'customer_id',
      otherKey: 'item_id',
      through: 'cart',
      as :'cart1'
    });
  };

  return customer;
};
