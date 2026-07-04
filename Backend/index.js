// --- LOGIN API ROUTE ---
app.post('/api/login', (req, res) => {
    // Frontend se aane wala username aur password nikalna
    const { username, password } = req.body;

    // Simple check (Abhi ke liye hum hardcode kar rahe hain)
    // Aap isko apne hisaab se change kar sakte hain
    if (username === 'admin' && password === 'beast123') {
        res.json({ success: true, message: 'Welcome Admin! Login Successful.' });
    } else {
        res.status(401).json({ success: false, message: 'Galat Username ya Password!' });
    }
});
