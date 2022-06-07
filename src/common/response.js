//Traer un paquete instalado llamado errors
//Errors nos permite crear errores
const createError = require("http-errors");

module.exports.Response = {
  success: (res, status = 200, message = "ok", body = {}) => {
    res.status(status).json({ message, body });
  },
  //siempre retorna un error que ocurrio internamente, asi pasarle errores
  error:(res,error=null)=>{
      //implementar casos de errores
const{statusCode, message}=error ? error : new createError.InternalServerError();
res.status(statusCode).json({message})
  }
};
