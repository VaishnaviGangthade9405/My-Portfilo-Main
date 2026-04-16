const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// 1. DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/portfolioDB')
    .then(() => console.log("✅ Database Connected Successfully!"))
    .catch(err => console.log("❌ MongoDB Connection Error: ", err));

// 2. SCHEMA (Tujhya HTML pramane fields set kele ahet)
const contactSchema = new mongoose.Schema({
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// 3. MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); 

// 4. ROUTES

// Home Page load karne
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// FEATURE: Contact Form Submit (Tujhya HTML 'name' sobat match kele ahe)
app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact({
            // req.body.userEmail he tujhya HTML madlya name="userEmail" sobat match hote
            email: req.body.userEmail,   
            // req.body.userMessage he tujhya HTML madlya name="userMessage" sobat match hote
            message: req.body.userMessage 
        });

        await newContact.save(); // Data MongoDB madhe save jhala
        
        res.send("<script>alert('✅ Success! Data saved in MongoDB.'); window.location='/';</script>");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving data.");
    }
});

// PROOF: Admin View (Mam la data dakhvnya sathi)
app.get('/admin-view', async (req, res) => {
    try {
        const allMessages = await Contact.find();
        res.json(allMessages); 
    } catch (error) {
        res.status(500).send("Error fetching data.");
    }
});

// 5. SERVER START
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`👀 Check live data at http://localhost:${PORT}/admin-view`);
});