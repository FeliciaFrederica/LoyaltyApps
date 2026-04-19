module.exports = (db) =>
  db.model(
    'Vouchers',
    new db.Schema(
      {
        code: { type: String, required: true, unique: true },
        discount: { type: String, required: true },
        quota: { type: Number, required: true },
        expiredAt: { type: Date, required: true },
      },
      { timestamps: true }
    )
  );
