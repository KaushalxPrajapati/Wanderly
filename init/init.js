const mongoose = require('mongoose');

const sampleData = require('./sampleData.js');

const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderly';
async function initDB() {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleData.data);
}

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connection Successful');

        await initDB();
        console.log('Database Initialized Successfully');

        await mongoose.connection.close();
    } catch (err) {
        console.log('MongoDB Connection Error', err);
    }
}

main();
