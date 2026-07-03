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