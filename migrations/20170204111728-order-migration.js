'use strict';
var models = require("../models/index.js");
module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(models.order.tableName,
          models.order.attributes);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('order');
  }
};
