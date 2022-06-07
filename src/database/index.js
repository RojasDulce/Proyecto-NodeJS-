//Base de datos con mongo db
//Voy a traer mi ppaquete mongo db
const { MongoClient, Promise } = require("mongodb");
const debug = require("debug")("app:module-database");
//Archivo de configuracion
const{Config}=require('../config/index');
var connection=null;
module.exports.Database = (collection) => new Promise(async(resolve, reject) => {
    //Codigo para conectarme a la bd
    //patron singlenot
    try{
        //para que no caega el servidor utilizaremos la misma conexion en caso de que ya exista
        if(!connection){
            //recibe un parametro de conexion de la bd
            const client = new MongoClient(Config.mongoUri);
            connection=await client.connect();
            debug('Nueva conexión realizada con mongodb');
        }
        debug('Reutilizando conexión a la base de datos');
        //recibe el nombre de la base de datos a la que quiero conectarme
        const db=connection.db(Config.mongoDbname);
        resolve(db.collection(collection));
    }catch(error){
        reject(error);
    }
});
//No existen relaciones en una base de datos no relacional o no sql
//Tiene colecciones de datos, las cuales tiene documentos y almacenamos informacion de forma JSON
