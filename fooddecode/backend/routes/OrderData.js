const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/OrderData', async (req, res) => {
    try {
        const { order_data, email, order_date } = req.body;

        // Check if the necessary data is provided
        if (!order_data || !email || !order_date) {
            return res.status(400).json({ error: "Missing order data, email, or order date" });
        }

        let existingOrder = await Order.findOne({ email });

        if (existingOrder) {
            // Find if there's already an entry for the given date
            let dateEntry = existingOrder.orders.find(order => order.order_date === order_date);

            if (dateEntry) {
                // If entry exists for the date, update it
                dateEntry.order_data = dateEntry.order_data.concat(order_data);
            } else {
                // Otherwise, add a new entry for the date
                existingOrder.orders.push({ order_date, order_data });
            }

            // Save the updated order document
            await existingOrder.save();
        } else {
            // Create a new order document
            await Order.create({ email, orders: [{ order_date, order_data }] });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
});

router.post('/MyOrderedData', async (req, res)=>{
    try {
        let mydata = await Order.findOne({'email': req.body.email})
        res.json({orderData: mydata})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
})
module.exports = router;
