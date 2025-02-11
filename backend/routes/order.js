const router = require('express').Router();

const { authToken } = require('../middleWare/userAuth.js');
const Book = require('../models/book.js');
const Order = require('../models/orders.js');
const User = require('../models/user.js');

// Place order
router.post('/place-order', authToken, async (req, res) => {
    try {
        console.log("Received order:", req.body);
        const {id, totalPrice, books} = req.body;

        if (!books || books.length === 0) {
            return res.status(400).json({ message: "Cart is empty, cannot place order" });
        }

        // Extract book IDs
        const bookIds = books.map(item => item._id);

        // Fetch book details from DB
        const fetchedBooks = await Book.find({ _id: { $in: bookIds } });

        if (fetchedBooks.length !== bookIds.length) {
            return res.status(404).json({ message: "One or more books not found" });
        }

        const newOrder = new Order({
            user: id,
            books: bookIds,
            totalPrice: totalPrice
        });

        const orderFromDB = await newOrder.save();

        // Save order in user model
       // Update user document: Add order & clear cart
       await User.findByIdAndUpdate(id, {
        $push: { orders: orderFromDB._id },
        $pull: { cart: { $in: bookIds } }
    });

    return res.status(201).json({
        status: 'success',
        message: 'Order placed successfully',
        order: orderFromDB
    });

} catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: 'An error occurred while placing the order' });
}
});


// Get order history of a user
router.get('/get-order-history', authToken, async (req, res) => {
    try {
        const id = req.body.id;
        const userData = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'books' }
        });

        const ordersData = userData.orders.length > 0 ? userData.orders.reverse() : [];

        return res.json({
            status: 'success',
            data: ordersData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

// Get all orders -- admin
router.get('/get-all-orders', authToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('books')
            .populate('user')
            .sort({ createdAt: -1 });

        return res.json({
            status: 'success',
            data: orders
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

// Update order status -- admin
router.put('/update-status/:id', authToken, async (req, res) => {
    try {
        const { id } = req.params;

        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: 'success',
            message: 'Status updated successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

// Subscribe a user
router.post('/subscribe', authToken, async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const subscriptionExpiryDate = new Date();
        subscriptionExpiryDate.setFullYear(subscriptionExpiryDate.getFullYear() + 1);

        const user = await User.findByIdAndUpdate(id, { isSubscribed: true, subscriptionExpiresAt: subscriptionExpiryDate }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            status: 'success',
            message: 'User subscribed successfully',
            data: user
        });

    } catch (error) {
        console.error("Error subscribing user:", error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
