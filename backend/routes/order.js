const router = require('express').Router();
const { authToken } = require('../middleWare/userAuth');
const Book = require('../models/book.js');
const Order = require('../models/orders.js');
const User = require('../models/user.js');

//place order
router.post('/place-order', authToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderDate of order){
            const newOrder = new Order({user: id, book: orderDate._id});
            const orderDateFromDB = await newOrder.save();

            //save order in user model
            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDateFromDB._id}
            });

            //clear cart
            await User.findByIdAndUpdate(id, {
                $pull: {cart: orderDate._id}
            });
        }

        return res.json({
            status: 'success',
            message: 'order placed successfully'
        });
        
    } catch (error){
        console.log(error);
        return res.status(500).json({message: 'an error occurred'});
    }
});

//get order history of particular user
router.get('/get-order-history', authToken, async (req, res) => {
    try{
        const id = req.body;
        const userData = await User.findById(id).populate(
           "Book").populate("orders");

        const ordersData = userData.orders.reverse();

        return res.json({
            status: 'success',
            data: ordersData
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({message: 'an err occured'});
    }
});

//get all orders -- admin
router.get('/get-all-orders', authToken, async (req, res) => {
    try{
        const userData = await Order.find()
        .populate({
            path: 'book'
        })
        .populate({
            path: 'user'
        })
        .sort({
            createdAt: -1
        });

        return res.json({
            status: 'success',
            data: userData
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({message: 'an err occured'});
    }
});

//update order -- admin
router.put('/update-status/:id', authToken, async (req, res) => {
    try{
        const {id} = req.params;

        await Order.findByIdAndUpdate(id, {status: req.body.status});

        return res.json({
            status: 'success',
            message: 'status updated successfully'
        });
        
    } catch(error){
        console.log(error);
        return res.status(500).json({message: 'an err occured'});
    }
});


module.exports = router;