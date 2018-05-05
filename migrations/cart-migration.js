'use strict';
var models = require("../models/index.js");
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(models.cart.tableName,
      models.cart.attributes);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('cart');
  }
};
