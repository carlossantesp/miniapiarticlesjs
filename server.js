'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 8080;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

//Configuracion de variables para conectar la base de datos de mongo
var urimongo = 'localhost';
var portmongo = '27017';
var dbapp = 'api_dev;';

//Conexion a la base de datos de mongodb
var dir_db_mongo = `mongodb://${urimongo}:${portmongo}/${dbapp}`;
mongoose.connect(dir_db_mongo, { useNewUrlParser: true})
        .then(function(){
            console.log("Conexion a la base de datos fue establecida correctamente");

            //Servidor web de peticiones HTTP
            app.listen(port, function(){
                console.log(`El servidor web esta corriendo correctamente en http://localhost:${port}`);
            });
        });