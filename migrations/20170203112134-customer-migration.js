'use strict';
var models = require("../models/index.js");
module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable(models.customer.tableName,
      models.customer.attributes);
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.dropTable('customer');
  }
};

