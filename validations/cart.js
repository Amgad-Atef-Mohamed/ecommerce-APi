const { Joi } = require('celebrate');

module.exports = {
  'getCartDetailsValidationSchema': {
    query: Joi.object().keys({
      customerId: Joi.number().required(),
    })
  },
  'insertItemValidationSchema': {
    body: Joi.object().keys({
      customerId: Joi.number().required(),
      quantity: Joi.number().required(),
    })
  },
  'editCartValidationSchema' : {
    body: Joi.object().keys({
      customerId: Joi.number().required(),
      quantity: Joi.number().required(),
      id: Joi.number(),
    })
  },
 'removeItemValidationSchema' : {
    body: Joi.object().keys({
      customerId: Joi.number().required(),
    })
  }
};