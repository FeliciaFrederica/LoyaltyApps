const productsRepository = require ('./products-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllProducts() {
  return await productsRepository.getProducts();
}

async function createProducts(data) {
  const { name, price, stock, description } = data;
  
  // validasi apakah harga dan nama tersedia
  if (!name || price === undefined) {
    throw new Error('Data tidak lengkap! Nama dan harga wajib diisi.');
  }

  // validasi apakah nominal harga yang dimasukkan bernilai minus
  if (price < 0) {
    throw new Error('Harga tidak valid! Harga tidak boleh kurang dari 0.');
  }

  // cek apakah ada duplikasi nama products
  const existingProducts = await productsRepository.getProducts();
  const isDuplicate = existingProducts.some(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );

  if (isDuplicate) {
    throw new Error('Nama produk sudah digunakan! Silakan gunakan nama lain.');
  }

  return await productsRepository.createProducts(name, price, stock, description);
}

module.exports = {
  getAllProducts,
  createProducts
};