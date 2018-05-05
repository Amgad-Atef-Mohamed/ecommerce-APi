"user strict";

const express= require('express'),
      app    = express(),
      server = require('http').createServer(app),
      bodyParser = require('body-parser'),
      routes = require('./routes/index'),
      open   = require("open"),
      helpers = require('./utilities/helper'),
      cors = require('cors');

const PORT = process.env.PORT || 1337;
const URL = '127.0.0.1';


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);
app.use(helpers.logError);
app.use(helpers.HandleErrorforclient);




server.listen(PORT, function (error) {
    if(error)
        console.log(error);
    console.log(`The Server Is Running ${URL}:${PORT}`);
    open(`http://${URL}:${PORT}`, "chrome");
});