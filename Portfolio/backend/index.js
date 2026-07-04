const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

// --- LOGIN API ROUTE ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body || {};

    if (username === 'admin' && password === 'beast123') {
        res.json({ success: true, message: 'Welcome Admin! Login Successful 🚀' });
    } else {
        res.status(401).json({ success: false, message: 'Galat Username ya Password!' });
    }
});

// --- SERVER START ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server blasting off on port ${PORT} 🚀`);
});
