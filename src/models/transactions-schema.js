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
      required: true,
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
    date: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  });

  return mongoose.model('Transactions', schema);
};
