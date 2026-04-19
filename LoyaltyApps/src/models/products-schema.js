module.exports = (db) =>
  db.model(
    'Products',
    new db.Schema({
      name: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true, default: 0 },
      description: { type: String }
    }, { timestamps: true })
  );