const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db.js'); // MongoDB connection utility

const app = express();
const port = 5000;

// Middleware for JSON
app.use(express.json());
app.use(cors());

// Import routes
const displayData = require('./routes/displayData.js');
const createUser = require('./routes/createUser.js');
const orderData = require('./routes/OrderData.js'); // Correct path
const MyOrderedData = require('./routes/OrderData.js'); // Correct path

// Ensure MongoDB is connected and collections are loaded before starting the server
const startServer = async () => {
    try {
        await connectToMongoDB(); // Load data and set global variables

        // Use routes
        app.use('/api', createUser);
        app.use('/api', orderData);
        app.use('/api', MyOrderedData);
        app.use('/api', displayData); // Use displayData routes

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
