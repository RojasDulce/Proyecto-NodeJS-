//traerme mi modulo de http errors
const createError = require("http-errors");
//para saber cual fue el error
const debug = require("debug")("app:module-products-controller");
const { ProductsService } = require("./services");
//importar errores del response de commons
const { Response } = require("../common/response");
module.exports.ProductsController = {
  //Funciones que controlan las rutas en index products
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      //Por si el body esta vacio
      //objetc. keys devuelve todas las claves del objeto body
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        //utilizar mi ervicio de create
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //update
  updateProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const productUpdated = await ProductsService.update(id, body);
        if (!productUpdated) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, "Producto modificado:", productUpdated);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const productDeleted = await ProductsService.delet(id);
      if (productDeleted === 0) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 201, "Producto eliminado:", productDeleted);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //controlador para el reporte
  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
