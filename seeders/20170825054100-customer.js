'use strict';
var md5 = require('md5');
module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('customer', [{
          first_name: 'code Tech',
          last_name: 'code Tech',
          email: 'techivance@techivance.com'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
