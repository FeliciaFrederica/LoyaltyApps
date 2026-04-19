module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        voucherId:{
            type: String
        },
        type: {
            type: String,
            enum: ['earn', 'redeem'],
            required: true,
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