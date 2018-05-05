'use strict';
var models = require("../models/index.js");
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(models.item.tableName,
      models.item.attributes);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('item');
  }
};
