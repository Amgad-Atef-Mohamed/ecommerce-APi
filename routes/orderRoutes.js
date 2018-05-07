"user strict";

const express = require('express'),
      orderRouter = express.Router(),
      models = require('../models/index'),
      helpers = require('../utilities/helper'),
      { celebrate } = require('celebrate'),
      _ = require('lodash'),
      submitOrderValidationSchema = require('../validations/submitOrder');

// 7. customerOrderHistory

orderRouter.get('/customers/:customerId/orders', function(req, res, next){

  const { customerId }  = req.params;
  const { page, perpage }  = req.query;

  models.order.findAll(_.merge({ where: { customer_id: { $eq : customerId} } }, helpers.determinePagination(page, perpage)))
    .then(customerOrders => {
      return res.status(200).json(customerOrders);
    })
    .catch(function (err) {
      next(err);
    });
});

// 6. submitOrder

orderRouter.post('/customers/:customerId/orders', celebrate(submitOrderValidationSchema),
  function(req, res, next){

  const { telephone, address }  = req.body;
  const { customerId }  = req.params;

  models.sequelize.transaction(function (t) {
    return models.customer.findOne({ include: [{ model: models.item, as: 'cart1'}],
        where : { id: { $eq: customerId } } }, {transaction: t})
      .then(function (customer) {
        let total = 0;
        customer.cart1.forEach(function(item) {
          total += parseInt(item.price)* item.cart.quantity;
        });
        return models.order.create({
          total: total,
          customer_id: customerId,
          address: address,
          telephone: telephone
        }, {transaction: t});
    });
  }).then(function (order) {
    return models.cart.delete({ where : { customer: { $eq: customerId} } } );
  }).then(function (result) {
    return res.status(200).json(result.toJSON());
  }).catch(function (err) {
    next(err);
  });
});

module.exports = orderRouter;