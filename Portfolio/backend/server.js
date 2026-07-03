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
// --- EXTERNAL API INTEGRATIONS ---

// 1. GitHub API Route
// Fetches live data like followers, public repos, and bio.
app.get('/api/github/:username', async (req, res) => {
    const { username } = req.params;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: "GitHub user not found" });
        }
        
        const data = await response.json();
        
        // Pick only the data you want to send to your frontend
        const profileData = {
            username: data.login,
            name: data.name,
            avatar_url: data.avatar_url,
            repos: data.public_repos,
            followers: data.followers,
            profile_url: data.html_url
        };
        
        res.status(200).json(profileData);
    } catch (error) {
        console.error("GitHub API Error:", error);
        res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
});

// 2. LeetCode API Route (Using their public GraphQL endpoint)
// Fetches your problem-solving stats (Easy, Medium, Hard solved)
app.get('/api/leetcode/:username', async (req, res) => {
    const { username } = req.params;
    
    // LeetCode requires a GraphQL query
    const query = `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query: query,
                variables: { username: username }
            })
        });

        const data = await response.json();
        
        if (data.errors) {
            return res.status(404).json({ error: "LeetCode user not found" });
        }

        // Extract the specific solved problem counts from the messy GraphQL response
        const stats = data.data.matchedUser.submitStats.acSubmissionNum;
        
        res.status(200).json({
            username: username,
            totalSolved: stats.find(item => item.difficulty === "All").count,
            easy: stats.find(item => item.difficulty === "Easy").count,
            medium: stats.find(item => item.difficulty === "Medium").count,
            hard: stats.find(item => item.difficulty === "Hard").count
        });
        
    } catch (error) {
        console.error("LeetCode API Error:", error);
        res.status(500).json({ error: "Failed to fetch LeetCode data" });
    }
});

// 3. LinkedIn "API" Route (Manual/Static Workaround)
// Since LinkedIn blocks scraping and public API access without OAuth, 
// the standard practice is to serve your stats from a local object that you update periodically.
app.get('/api/linkedin', (req, res) => {
    // You will update these numbers manually once a month or so
    const linkedInStats = {
        connections: "500+",
        followers: 1240,
        status: "Actively looking for Software Development Internships",
        profile_url: "https://www.linkedin.com/in/sudhanshu-kumar-b62113407"
    };
    
    res.status(200).json(linkedInStats);
});
const jwt = require('jsonwebtoken');

// Secret key for JWT (In production, put this in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_x_beast_key_2026";

// Dummy Admin Credentials (In a real app, this would be hashed in a database)
const ADMIN_USER = {
    username: "sudhanshu",
    password: "password123" // Change this!
};

// POST: Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 1. Check if username and password match our dummy admin
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        
        // 2. Generate a JWT token that expires in 1 hour
        const token = jwt.sign(
            { id: 1, role: 'admin', username: username }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // 3. Send the token back to the frontend
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token: token
        });
    }

    // If credentials fail, send a 401 Unauthorized error
    return res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
});
