const { Joi } = require('celebrate');

module.exports = {
  body: Joi.object().keys({
    address: Joi.string().required(),
    telephone: Joi.number().integer(),
  })
};