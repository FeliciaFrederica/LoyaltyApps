module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        UserId: {
            type: String,
            requires: true
        },
        productId: {
            type: String
        },
        type: {
            type: String,
            enum: ['earn', 'redeem', 'order'],
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Transactions', schema);
};