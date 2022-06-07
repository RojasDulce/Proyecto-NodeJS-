//const { application } = require('express');
const express = require("express");
const { ProductsController } = require("./controller");
//nos permite manejar las rutas del modulo
const router = express.Router();

module.exports.ProductsAPI = (app) => {
  //recibimos la aplicacion para configurar lo que necesitemos en el modulo
  //definir las rutas del modulo productos
  router
    .get("/", ProductsController.getProducts) //http://localhost:3000/api/products/
    //el reporte esta antes que el id
    .get("/report",ProductsController.generateReport)
    .get("/:id", ProductsController.getProduct) //http://localhost:3000/api/products/2
    .post("/", ProductsController.createProduct)
    .post("/update/:id",ProductsController.updateProduct)
    .post("/delete/:id",ProductsController.deleteProduct);

 
  //agregamos el router a la app
  //se concatena esta ruta con las de arriba
  app.use("/api/products", router);
};
