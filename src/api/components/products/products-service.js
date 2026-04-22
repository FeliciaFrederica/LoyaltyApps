const productsRepository = require('./products-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllProducts() {
  return await productsRepository.getProducts();
}

async function createProducts(data) {
  const { name, price, stock, description } = data;

  // validasi apakah harga dan nama tersedia
<<<<<<< HEAD
  if (!name || name.trim() === ' ' || price === undefined) {
    throw new Error('Data tidak lengkap! Nama dan harga wajib diisi.');
=======
  if (!name || name.trim() === '' || price === undefined) {
      const error = new Error('Data tidak lengkap! Nama dan harga wajib diisi.');
      error.status = 400;
      throw error;
>>>>>>>>> Temporary merge branch 2
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
  // logic
  const { name, price, stock, description } = data;

  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Produk tidak ditemukan.');
  }

  // cek validasi input nama
  if (name !== undefined && name.trim() === ' ') {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'Input tidak valid. Pastikan nama tidak kosong.'
    );
  }

  // cek validasi input harga
  if (price !== undefined && price < 0) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'Input tidak valid. Pastikan angka lebih besar dari 0.'
    );
  }

  // cek validasi input stok
  if (data.stock !== undefined && data.stock < 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Input tidak valid. Pastikan angka lebih besar dari 0.'
    );
  }

  // cek validasi duplikasi nama produk
  if (name && name.toLowerCase() !== product.name.toLowerCase) {
    const existingProducts = await productsRepository.getProductByName(name);
    if (existingProducts) {
      throw errorResponder(
        errorTypes.BAD_REQUEST,
        'Input tidak valid. Pastikan nama produk berbeda.'
      );
    }
  }

  const result = await productsRepository.updateProducts(
    id,
    name,
    price,
    stock,
    description
  );
  return { message: 'Produk berhasil diperbarui!', detail: result };
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
