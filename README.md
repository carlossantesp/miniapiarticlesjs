# Mini API RESTful NodeJS, Express y MongoDB

Este es un mini API RESTful de practica con NodeJS, Express y conexión con MongoDB para articulos

## Instalación

Para instalar, primero clone este projecto con `git clone`

Para hacer funcionar el API ejecute los siguientes comandos:

* Instalar los modulos

``` bash
$ npm install
```

* Revisar que tenga el servicio de mongodb activo (En windows ejecutar el archivo `mongod.exe`) en linux ejecutar en la terminal el siguiente comando:

``` bash
$ sudo systemctl start mongodb
```
> Para revisar que mongodb esta activo en linux puede ejecutar en la terminal `sudo systemctl status mongodb` si dice **active** significa que el servicio de mongodb esta activo y funcionando correctamente

* Iniciar el servidor web con el siguiente comando

``` bash
$ npm start
```

Si todo salio correctamente saldra los siguiente en la terminal (consola en Windows):

``` bash
    [nodemon] 2.0.2
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching dir(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node server.js`
    Conexion a la base de datos fue establecida correctamente
    El servidor web esta corriendo correctamente en http://localhost:8080
```

## Rutas de prueba
Las siguientes rutas son las que funcionan en la API

METODO | RUTA | DESCRIPCION
-- | -- | --
GET | http://localhost:8080/api/articles | Lista todos los articulos
POST | http://localhost:8080/api/articles | Crea un articulo (Body: title, content)
GET | http://localhost:8080/api/articles/5e65ba16b1eed5175cd624a9 | Muestra un articulo con el id `5e65ba16b1eed5175cd624a9`
PUT | http://localhost:8080/api/articles/5e65ba16b1eed5175cd624a9 | Actualiza los datos del articulo con id: `5e65ba16b1eed5175cd624a9` (Body: title, content)
DELETE | http://localhost:8080/api/articles/5e65ba16b1eed5175cd624a9 | Elimina el articulo con id: `5e65ba16b1eed5175cd624a9`
GET | http://localhost:8080/api/upload-image/articles/5e65ba16b1eed5175cd624a9 | Sube una imagen al articulo con id: `5e65ba16b1eed5175cd624a9` (Body: file0 ojo debe ser tipo file y ser imagen jpg,png,jpeg,svg)
GET | http://localhost:8080/api/get-image/articles/5e65ba16b1eed5175cd624a9 | Visualiza la imagen del articulo con id: `5e65ba16b1eed5175cd624a9`
GET | http://localhost:8080/api/search/articles?search=Articulo | Buscar el articulo con el parametro search Articulo
GET | http://localhost:8080/api/articles?last=last | Lista solo los ultimos 5 articulos guardados

> El id del articulo puede variar, ya que mongodb genere automaticamente un id cuando guarda un articulo en la base de datos de mongodb