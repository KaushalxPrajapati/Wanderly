const express = require('express');
const app = express();
const PORT = 8080;

const methodOverride = require('method-override');

const path = require('path');
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderly';

const Listing = require('./models/listing');

// Explain these two lines (13th and 14th), what is it, why it's written and what will happen if not written properly or loosely or not at all
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/listings');
});

// ------------------------------------------------------
// All listings (Index Route)
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('index.ejs', { allListings });
});

// ------------------------------------------------------
// New Route (Serves the form)
app.get('/listings/new', (req, res) => {
    res.render('new.ejs');
});

// ------------------------------------------------------
// Show Route
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('show.ejs', { listing });
});

// ------------------------------------------------------
// Create Route
app.post('/listings', async (req, res) => {
    formDataObj = req.body;
    const newListing = new Listing(formDataObj);
    await newListing.save();
    res.redirect('/listings');
});

// ------------------------------------------------------
// Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('edit.ejs', { listing });
});

// ------------------------------------------------------
// Update Route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    console.log('Updated', listing);
    res.redirect(`/listings/${id}`);
});

// ------------------------------------------------------
// Delete Route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect('/listings');
});

// ------------------------------------------------------

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connection Successful');

        app.listen(PORT, () => {
            console.log(`Server is running  on http://localhost:${PORT}/listings`);
        });
    } catch (err) {
        console.log('MongoDB connection failed:', err);
    }
}

main();
