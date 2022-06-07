//Funciones que se exportan
const excelGenerator = (products,name, res) => {
  //excel4node nos ayuda a generar los reportes con nodeJS
  const xl = require("excel4node");
  //hacer map a los productos
  products = products.map((product) => {
    let id = product._id.toString();
    delete product._id;
    return {
      id,
      ...product,
    };
  });
  //trabajams con la libreria
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet("inventario");
  //se mueve en las filas
  for (let i = 1; i <= products.length; i++) {
    //se mueve en las columnas
    for (let j = 1; j >= Object.values(products[0]).length; j++) {
      //almacenar los datos en las celdas
      let data = Object.values(products[i-1])[j-1];
      //Agregamos el valor a la celda, se especifica que tipo de valor 
      if(typeof data==='string'){
          ws.cell(i,j).string(data)
      }else{
          ws.cell(i,j).number(data);
      }
    }
  }
  wb.write(`${name}.xlsx`,res);
};
module.exports.Productsutils={
    excelGenerator
}