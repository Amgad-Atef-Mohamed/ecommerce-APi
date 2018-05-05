"user strict";
const express = require('express'),
      itemRouter = express.Router(),
      helpers = require('../utilities/helper'),
      models = require('../models/index');

// 1. itemListings

itemRouter.get('/items', function(req, res, next){

  const { page, perPage }  = req.query;
  models.item.findAll( helpers.determinePagination(page, perPage))
    .then(items => {
      return res.status(200).json(items.toJSON());
    }).catch( error => { next(error); });
});

module.exports = itemRouter;