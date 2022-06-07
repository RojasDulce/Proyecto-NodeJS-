//se ocupa un objeto para realizar busquedas
const { ObjectId } = require("mongodb");
//Lo primero es traerse el modeulo de la bd
const { Database } = require("../database/index");
const COLLECTION = "ventas";
//Obtiene todos los productos
const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};
//Funcion para realizar busquedas en base al id de un producto
const getById = async (id) => {
  const collection = await Database(COLLECTION);
  //findOne es un metdoo de mongo y recibe una consulta
  return collection.findOne({ _id: ObjectId(id) });
};
//crear un nuevo producto
const create = async (venta) => {
  const collection = await Database(COLLECTION);
  //creacion de variable result y tomamos lo que retorne la coleccion y usamos otro metodo de mongo
  let result = await collection.insertOne(venta);
  //Cual fue el identificador del objeto que se agrego
  return result.insertedId;
};
//update
const update = async (id, newValue) => {
  const coleccion = await Database(COLLECTION);
  const filter = { _id: ObjectId(id) };
  const options = { upsert: false };
  const updateVenta = {
    $set: {
      ...newValue,
    },
  };
  const result = await coleccion.updateOne(filter, updateVenta, options);
  return await getById(id);
};
//delete
const delet = async (id) => {
  const coleccion = await Database(COLLECTION);
  const query = { id: ObjectId(id) };
  const venta = await getById(id);
  const result = await coleccion.deletOne(query);
  if (result.deletCount === 1) {
    return venta;
  } else {
    return 0;
  }
};
module.exports.VentasService = {
  getAll,
  getById,
  create,
};