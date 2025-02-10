const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Book"
        }
    ],
    status: {
        type: String,
        default: 'order placed',
        enum: ['order placed', 'completed', 'out for delivery', 'delivered']
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('orders', orders);
