const productsService = require('./products-service');

async function getProducts(request, response, next) {
  try{
    const products = await productsService.getAllProducts();
    response.status(200).json(products);
  } catch (error){
    next(error);
  }
}

async function addProducts(request, response, next) {
  try{
    const productsData = request.body;
    const newProducts = await productsService.createProducts(productsData);
    response.status(201).json(newProducts);
  } catch (error){
    next(error);
  }
}

module.exports = {
  getProducts,
  addProducts,
};