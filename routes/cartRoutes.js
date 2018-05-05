"user strict";

const express = require('express'),
      cartRouter = express.Router(),
      models = require('../models/index'),
      { getCartDetailsValidationSchema, insertItemValidationSchema, editCartValidationSchema,
        removeItemValidationSchema } = require('../validations/cart'),
      { celebrate } = require('celebrate');

// 5. getCartDetails

cartRouter.get('/carts', celebrate(getCartDetailsValidationSchema), function(req, res, next){

  const { customerId } = req.query;
  models.customer.findOne({ include: [{ model: models.item, as: 'cart1'}], where : { id: { $eq : customerId}} })
  .then(customer => {
    let total = 0;
    customer = customer.toJSON();

    customer.cart1.forEach(function(item) {
      item.total = parseInt(item.price)* item.cart.quantity;
      total= parseInt(item.price)* item.cart.quantity;
    });

    customer.total = total;
    return res.status(200).json(customer);
  }).catch( error => { next(error); });
});

// 2. insertItem

cartRouter.post('/items/:itemId/cart', celebrate(insertItemValidationSchema) , function(req, res, next){

  const { itemId } = req.params;
  const { customerId, quantity } = req.body;
  models.item.findOne({ where: { id :{$eq:  itemId}}})
    .then(function (item) {
      if(item)
        return models.cart.findOne({ where: { $and: { customer_id: customerId, item_id: itemId } } });
      else
        return res.status(404).json({ message: 'there is not item with that id' });
    }).then(function (cart) {
      if(! cart)
        return models.cart.create({customer_id: customerId, item_id: itemId, quantity: quantity});
      else
        return res.status(400).json({ message: 'already exist in your cart' });
    })
    .then(cart => {
        return res.status(201).json(cart.toJSON());
    })
    .catch( error => { next(error); });
});

// 4. editCart

cartRouter.put('/items/:itemId/cart', celebrate(editCartValidationSchema), function(req, res, next){

   const { itemId } = req.params;
   const { customerId, quantity, id } = req.body;
   models.cart.upsert({ id: id, customer_id: customerId, item_id: itemId, quantity: quantity})
    .then(() => res.status(200))
    .catch( error => { next(error); });
});

// 3. removeItem

cartRouter.delete('/items/:itemId/cart',celebrate(removeItemValidationSchema), function(req, res, next){

  const { itemId } = req.params;
  const { customerId } = req.body;
  models.cart.destroy({ where : { $and: [{ customer_id: customerId}, {item_id: itemId }] } })
    .then(() => res.status(200))
    .catch( error => { next(error); });
});

module.exports = cartRouter;