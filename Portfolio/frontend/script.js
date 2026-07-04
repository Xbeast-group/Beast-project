// --- Modal Toggle Function ---
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// --- Jab Page Pura Load Ho Jaye ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Radar Chart Setup
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['C/C++', 'Python', 'Windows/Linux', 'Problem Solving', 'Communication'],
                datasets: [{
                    label: 'Skill Level',
                    data: [85, 75, 65, 90, 80],
                    backgroundColor: 'rgba(168, 85, 247, 0.4)',
                    borderColor: 'rgba(168, 85, 247, 1)',
                    pointBackgroundColor: 'rgba(168, 85, 247, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { 
                            color: '#e2e8f0', 
                            font: { size: 12, family: "'Inter', sans-serif" }
                        },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 2. Login Form Backend Connection
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const usernameInput = document.getElementById('adminUsername').value;
            const passwordInput = document.getElementById('adminPassword').value;
            const errorMessage = document.getElementById('loginErrorMessage');

            try {
                // Backend ko request bhej rahe hain (Port 5000 par)
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: usernameInput, password: passwordInput })
                });

                const data = await response.json();

                if (data.success) {
                    alert(data.message); // Login successful alert
                    toggleLoginModal();  // Modal band karein
                    document.getElementById('loginForm').reset(); // Form clear karein
                } else {
                    if (errorMessage) {
                        errorMessage.innerText = data.message; // Galat password error
                        errorMessage.classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Backend server band hai! Kripya VS Code ke terminal mein "node server.js" chalayein.');
            }
        });
    }
});
