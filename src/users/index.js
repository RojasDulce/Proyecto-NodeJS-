//const { application } = require('express');
const express = require("express");
const { UsersController} = require('./controller');
//nos permite manejar las rutas del modulo
const router = express.Router();

module.exports.UsersAPI = (app) => {
  //recibimos la aplicacion para configurar lo que necesitemos en el modulo
  //definir las rutas del modulo productos
  router
    .get("/", UsersController.getUsers) //http://localhost:3000/api/products/
    .get("/:id", UsersController.getUser) //http://localhost:3000/api/products/2
    .post("/", UsersController.createUser)
    .post("/update/:id",UsersController.updateUser)
    .post("/delete/:id",UsersController.deleteUser);

 
  //agregamos el router a la app
  //se concatena esta ruta con las de arriba
  app.use("/api/users", router);
};