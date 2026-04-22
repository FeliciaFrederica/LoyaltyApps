module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    },

    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vouchers',
    },

    type: {
      type: String,
      enum: ['earn', 'redeem', 'order'],
      required: true,
    },

    points: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Transactions', schema);
};