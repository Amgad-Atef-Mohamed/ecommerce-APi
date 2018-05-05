"use strict"
var itemRouter =require("./itemRoutes");
var cartRouter = require('./cartRoutes');
var orderRouter = require('./orderRoutes');

module.exports=  function ConfigApiRoutes(app) {

    app.use('/api/v1/',itemRouter);
    app.use('/api/v1/',cartRouter);
    app.use('/api/v1/',orderRouter);

    app.get('/', (req, res) => {
        res.render('login');
    });
};