//Inicio del servidor
const express = require("express");
//Para ya no utilizar clg
const debug = require("debug")("app:main");
const { Config } = require("./src/config/index");
//exportar
const { ProductsAPI } = require("./src/products/index");
const{UsersAPI}=require("./src/users/index");
const{VentasAPI}=require("./src/ventas/index");
const{IndexAPI,NotFoundAPI}=require("./src/index");
const app = express();
//Capacidad de agregar datos en el request
app.use(express.json());
IndexAPI(app);
//Apartir de aqui se agregan los modulos
ProductsAPI(app);
UsersAPI(app);
VentasAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () => {
  //No voy a agregar htttp porque llegará un momento en el que trabaje en internet y no trabajara en el localhost
  //Escuchará en el puerto 3000 en cualquier coputador en el que se encuentre
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
//Hasta aqui servidor levantado