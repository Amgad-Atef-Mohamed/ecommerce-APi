"use strict";

module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED ,
        primaryKey: true ,
        autoIncrement: true
    },
    address :{
        type: DataTypes.TEXT,
        allowNull:false
    } ,
    customer_id : {
        type: DataTypes.INTEGER.UNSIGNED ,
        allowNull: false,
        references: {
            model: "customer",
            key: "id"
        }
    },
    total : {
        type:DataTypes.INTEGER,
        allowNull : false
    },
    telephone : {
      type:DataTypes.INTEGER,
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
      tableName: 'order'
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  order.associate = function(models) {
    order.belongsTo(models.customer, {
            onDelete: "CASCADE",
            foreignKey:  'customer_id',
            targetKey: 'id',
            as :'customer'
        });
    };
  return order;
};
