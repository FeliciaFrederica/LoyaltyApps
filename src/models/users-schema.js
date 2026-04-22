module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
      points: {
        type: Number,
        default: 0,
      },
      vouchers: [
        {
          type: db.Schema.Types.ObjectId,
          ref: 'Vouchers',
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      saldo: {
        type: Number,
        default: 0,
      },
    })
  );
