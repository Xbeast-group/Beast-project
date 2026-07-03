// Language: JavaScript
// Runtime: Node.js
// Framework: Express.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// Enable CORS so your frontend can communicate with this backend safely
app.use(cors({
    origin: '*', // In production, replace with your frontend URL (e.g., 'https://sudhanshu.dev')
    methods: ['GET', 'POST']
}));
// Parse incoming JSON payloads
app.use(express.json());

// --- MOCK DATABASE (For Demonstration) ---
const projectsData = [
    {
        id: 1,
        title: "Modern Portfolio Optimizer",
        description: "A financial tool using MPT to calculate the efficient frontier and optimize stock risk-to-reward ratios.",
        tags: ["HTML/Tailwind", "JavaScript", "Python API"],
        github: "https://github.com/sudhanshukryadav2008"
    },
    {
        id: 2,
        title: "E-Commerce REST API",
        description: "A secure backend API for an e-commerce platform with JWT authentication and database management.",
        tags: ["Node.js", "MongoDB"],
        github: "https://github.com/sudhanshukryadav2008"
    }
];

// --- ROUTES / ENDPOINTS ---

// Health Check / Base Route
app.get('/', (req, res) => {
    res.json({ message: "X-Beast Portfolio Backend API is running smoothly!" });
});

// GET: Fetch all projects dynamically
app.get('/api/projects', (req, res) => {
    res.status(200).json(projectsData);
});

// POST: Handle Contact Form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Please fill out all fields." });
    }

    // Realistic logging (In a real app, write this to MongoDB or send an email via Nodemailer)
    console.log(`\n--- NEW CONTACT MESSAGE RECEIVED ---`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log(`------------------------------------\n`);

    // Respond back to your frontend
    res.status(200).json({ 
        success: true, 
        message: "Thank you for reaching out, Sudhanshu will get back to you shortly!" 
    });
});

// --- ERROR HANDLING MIDDLEWARE ---
app.use((req, res, Land) => {
    res.status(404).json({ error: "Route not found" });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server blasting off on port ${PORT} 🚀`);
});