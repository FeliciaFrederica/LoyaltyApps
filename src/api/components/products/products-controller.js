const productsService = require('./products-service');

async function getProducts(request, response, next) {
  try{
    const products = await productsService.getAllProducts();
    reponse.status(200).json({
      success: true,
      data: products
    });
  } catch (error){
    next(error);
  }
}

async function addProducts(request, response, next) {
  try{
    const productsData = request.body;
    const newProducts = await productsService.createProducts(productsData);
    response.status(200).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: newProducts
    });
  } catch (error){
    next(error);
  }
}

module.exports = {
  getProducts,
  addProducts,
};
