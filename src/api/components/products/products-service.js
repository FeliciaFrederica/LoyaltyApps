const productsRepository = require('./products-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllProducts() {
  return await productsRepository.getProducts();
}

async function createProducts(data) {
  const { name, price, stock, description } = data;

  // validasi apakah harga dan nama tersedia
  if (!name || name.trim() === '' || price === undefined) {
      const error = new Error('Data tidak lengkap! Nama dan harga wajib diisi.');
      error.status = 400;
      throw error;
  }

  // validasi apakah nominal harga yang dimasukkan bernilai minus
  if (price < 0) {
      const error = new Error('Harga tidak valid! Harga tidak boleh kurang dari 0.');
      error.status = 400;
      throw error;
  }

  // cek apakah ada duplikasi nama products
  const existingProduct = await productsRepository.findByName(name.trim());
  
  if (existingProduct) {
    const error = new Error('Produk sudah terdaftar!');
    error.status = 409; 
    throw error;
  }

  const newProduct = await productsRepository.createProduct(
    name.trim(),
    price,
    stock,
    description
  );

  return {
    success: true,
    message: 'Produk berhasil ditambahkan',
    data: newProduct
  };

}

async function updateProduct(id, data) {
  const product = await productsRepository.getProductById(id);

  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Product Not Found!');
  }

  // cek validasi input stok
  if (data.stock !== undefined && data.stock < 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Invalid Value: must be a positive number.'
    );
  }

  // logic
  const { name, price, stock, description } = data;
  const result = await productsRepository.updateProducts(
    id,
    name,
    price,
    stock,
    description
  );

  // cek validasi input produk
  if (result.matchedCount === 0) {
    throw errorResponder(
      errorTypes.NOT_FOUND,
      'Update Failed: Product Not Found!'
    );
  }

  return { message: 'Product updated successfully!', detail: result };
}

// async function deleteProduct(id) {
//   // to do
// }

module.exports = {
  getAllProducts,
  createProducts,
  updateProduct,
  // deleteProduct,
};
