//traerme mi modulo de http errors
const createError = require("http-errors");
//para saber cual fue el error
const debug = require("debug")("app:module-users-controller");
const { UsersService } = require("./services");
//importar errores del response de commons
const { Response } = require("../common/response");
module.exports.UsersController = {
  //Funciones que controlan las rutas en index products
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `User ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      //Por si el body esta vacio
      //objetc. keys devuelve todas las claves del objeto body
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        //utilizar mi ervicio de create
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //update
  updateUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const serviceUpdated = await UsersService.update(id, body);
        if (!userUpdated) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, "Usuario modificado:", userUpdated);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const userDeleted = await UsersService.delet(id);
      if (userDeleted === 0) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, "Usuario eliminado:", userDeleted);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};