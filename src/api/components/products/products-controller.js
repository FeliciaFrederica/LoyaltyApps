const productsService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getProducts(request, response, next) {
  try {
    const products = await productsService.getAllProducts();
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function addProducts(request, response, next) {
  try {
    const productsData = request.body;
    const newProducts = await productsService.createProducts(productsData);
    response.status(201).json(newProducts);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(request, response, next) {
  try {
    const { id } = request.params;
    const data = request.body;

    if (Object.keys(data).length === 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'At least one field must be provided for update'
      );
    }
    const result = await productsService.updateProduct(id, data);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// async function deleteProduct(request, response, next) {
//   // to do
// }

module.exports = {
  getProducts,
  addProducts,
  updateProduct,
  // deleteProduct,
};
