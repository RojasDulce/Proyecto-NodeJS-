//const { application } = require('express');
const express = require("express");
const { VentasController} = require("./controler");
//nos permite manejar las rutas del modulo
const router = express.Router();

module.exports.VentasAPI = (app) => {
  //recibimos la aplicacion para configurar lo que necesitemos en el modulo
  //definir las rutas del modulo productos
  router
    .get("/", VentasController.getVentas) //http://localhost:3000/api/products/
    .get("/:id", VentasController.getVenta) //http://localhost:3000/api/products/2
    .post("/", VentasController.createVenta)
    .post("/update/:id",VentasController.updateVenta)
    .post("/delete/:id",VentasController.deleteVenta);

 
  //agregamos el router a la app
  //se concatena esta ruta con las de arriba
  app.use("/api/ventas", router);
};