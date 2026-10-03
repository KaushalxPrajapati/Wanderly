const express = require('express');
const app = express();
const PORT = 8080;

const path = require('path');
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderly';

const Listing = require('./models/listing');

// Explain these two lines (13th and 14th), what is it, why it's written and what will happen if not written properly or loosely or not at all
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('It is working!');
});

app.get('/sample-listings', async (req, res) => {
    const sampleListing = new Listing({
        title: 'KP Villa',
        description: 'Luxury Villa for travellers',
        image: '',
        price: 12000,
        location: 'Jamshedpur, Jharkhand',
        country: 'India',
    });

    await sampleListing.save();
    res.send('Sample Listing Inserted');
});

app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('index.ejs', { allListings });
});

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connection Successful');

        app.listen(PORT, () => {
            console.log(`Server is running  on http://localhost:${PORT}`);
            console.log(`Server is running  on http://localhost:${PORT}/listings`);
        });
    } catch (err) {
        console.log('MongoDB connection failed:', err);
    }
}

main();
