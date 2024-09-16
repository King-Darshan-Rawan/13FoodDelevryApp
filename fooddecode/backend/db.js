const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/ApnaKhana';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetch the collections and store them globally
        const db = mongoose.connection.db;
        const itemsCollection = await db.collection('ApnaKhanaItem').find({}).toArray();
        const categoryCollection = await db.collection('ApnaKhanaCollection').find({}).toArray();

        globalThis.ApnaKhanaItem = itemsCollection;
        globalThis.ApnaKhanaCollection = categoryCollection;

        console.log("Global collections set");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

module.exports = connectToMongoDB;
