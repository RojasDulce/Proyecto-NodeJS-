//traerme mi modulo de http errors
const createError = require("http-errors");
//para saber cual fue el error
const debug = require("debug")("app:module-ventas-controller");
const { VentasService } = require("./services");
//importar errores del response de commons
const { Response } = require("../common/response");
module.exports.VentasController = {
  //Funciones que controlan las rutas en index products
  getVentas: async (req, res) => {
    try {
      let ventas = await VentasService.getAll();
      Response.success(res, 200, "Lista de ventas", ventas);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getVenta: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let venta = await VentasService.getById(id);
      if (!venta) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Venta ${id}`, venta);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createVenta: async (req, res) => {
    try {
      const { body } = req;
      //Por si el body esta vacio
      //objetc. keys devuelve todas las claves del objeto body
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        //utilizar mi ervicio de create
        const insertedId = await VentasService.create(body);
        Response.success(res, 201, "Venta agregada", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //update
  updateVenta: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const serviceUpdated = await VentasService.update(id, body);
        if (!userUpdated) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, "Venta modificada:", ventaUpdated);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteVenta: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const ventaDeleted = await VentasService.delet(id);
      if (ventaDeleted === 0) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, "Venta eliminada:", ventaDeleted);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};