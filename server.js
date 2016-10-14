var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

var mongoose = require('./app/config/config.js'),
    router = require('./app/config/route'),
    port = process.env.PORT || 8080,    
    morgan = require('morgan');


app.use(bodyParser.urlencoded({extender: true}))
   .use(bodyParser.json())
   .use('/api', router)
   .use(morgan('dev'))
   .listen(port);
   
console.log('Magic happens on port ', port);