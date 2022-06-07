//Nos ayuda a traer las variables de env
require("dotenv").config();
//Caracteristica de NodeJS es que todo es pequeños modulos
//Module.exports siempre retorna algo como un objeto
module.exports.Config = {
  //variables de entorno
  port: process.env.PORT,
  //para acceder a la base de datos
  mongoUri: process.env.MONGO_URI,
  mongoDbname: process.env.MONGO_DBNAME,
};
