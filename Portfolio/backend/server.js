const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows front-end to talk to back-end
app.use(express.json()); // Parses incoming JSON data

// Contact Form API Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Prototype Log (In production, you'd save this to a database or send an email)
    console.log(`📬 New Message Received from ${name} (${email}): ${message}`);

    // Send success response back to front-end
    res.status(200).json({ message: 'Form submitted successfully!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running smoothly on http://localhost:${PORT}`);
});
// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows your frontend to talk to this backend
app.use(express.json()); // Allows the server to read JSON data sent from the frontend

// Contact Form API Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation check
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    // Terminal log simulating a database entry
    console.log(`\n📬 [NEW MESSAGE RECEIVED]`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}\n`);

    // Success response to the client
    res.status(200).json({ success: true, message: 'Message received safely!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB (Local instance for prototyping)
// If you use MongoDB Atlas later, change this string to your cloud URI
const mongoURI = 'mongodb://127.0.0.1:27017/portfolio_db';
mongoose.connect(mongoURI)
    .then(() => console.log('📁 MongoDB connected successfully!'))
    .catch(err => console.error('❌ Database connection error:', err));

// 2. Define a Contact Schema & Model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// 3. Updated API Endpoint saving directly to DB
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    try {
        // Create and save new document into database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log(`💾 Saved to Database: Message from ${name}`);
        res.status(200).json({ success: true, message: 'Message saved securely!' });
    } catch (error) {
        console.error('Error saving to DB:', error);
        res.status(500).json({ error: 'Internal server error failed to save message.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});