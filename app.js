'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//Rutas
var routes_app = require('./app/routers/articles');

//Middlewares
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Prefijo /api en las rutas
app.use('/api',routes_app);

module.exports = app;