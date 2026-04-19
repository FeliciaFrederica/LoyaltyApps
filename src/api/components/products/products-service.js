const productsRepository = require ('./products-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllProducts() {
  return await productsRepository.getProducts();
}

async function createProducts(data) {
  const { name, price, stock, description } = data;
  
  // validasi apakah harga dan nama tersedia
  if (!name || price === undefined) {
      const error = new Error('Data tidak lengkap! Nama dan harga wajib diisi.');
      error.status = 400;
      throw error;
  }

  // validasi apakah nominal harga yang dimasukkan bernilai minus
  if (price < 0) {
      const error = new Error('Harga tidak valid! Harga tidak boleh kurang dari 0.');
      error.status = 401;
      throw error;
  }

  // cek apakah ada duplikasi nama products
  const existingProducts = await productsRepository.getProducts();
  const isDuplicate = existingProducts.some(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );

  if (isDuplicate) {
      const error = new Error('Nama produk sudah digunakan! Silakan gunakan nama lain.');
      error.status = 409;
      throw error;
  }

  return await productsRepository.createProducts(name, price, stock, description);
}

module.exports = {
  getAllProducts,
  createProducts
};