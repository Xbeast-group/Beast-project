document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseText = document.getElementById('formResponse');

    try {
        // Send data to our Node.js Back-End
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();
        
        if (response.ok) {
            responseText.innerText = "🚀 Message sent successfully!";
            responseText.style.color = "green";
            document.getElementById('contactForm').reset();
        } else {
            responseText.innerText = "❌ Error: " + data.error;
            responseText.style.color = "red";
        }
    } catch (error) {
        responseText.innerText = "❌ Could not connect to the backend server.";
        responseText.style.color = "red";
    }
});