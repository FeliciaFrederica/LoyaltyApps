const productsService = require('./products-service');

// untuk melihat daftar product yang ada
async function getProducts(request, response, next) {
  try{
    const products = await productsService.getAllProducts();
    response.status(200).json({
      success: true,
      data: products
    });
  } catch (error){
    next(error);
  }
}

// untuk menambahkan product
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
