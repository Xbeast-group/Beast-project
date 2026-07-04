
// --- LOGIN FORM SUBMISSION ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Form submit hone par page refresh ko rokne ke liye
        
        const usernameInput = document.getElementById('adminUsername').value;
        const passwordInput = document.getElementById('adminPassword').value;
        const errorMessage = document.getElementById('loginErrorMessage');

        try {
            // Backend API ko data bhejna
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: usernameInput, password: passwordInput })
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message); // Success alert
                toggleLoginModal();  // Modal ko close karne ke liye
                // Aap yahan admin dashboard page par redirect bhi kar sakte hain
            } else {
                // Agar password galat hai toh error message dikhana
                if (errorMessage) {
                    errorMessage.innerText = data.message;
                    errorMessage.classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Backend server se connection fail ho gaya!');
        }
    });
}
// 1. Function to toggle the Login Modal
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; 
    }
}

// 2. RUN EVERYTHING WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", () => {
    
    // --- A. Modal Close Listener ---
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleLoginModal();
            }
        });
    }

    // --- B. Skills Radar Chart ---
    const canvas = document.getElementById('skillsChart');
    if (canvas) {
        const ctxSkills = canvas.getContext('2d');
        new Chart(ctxSkills, {
            type: 'radar',
            data: {
                labels: ['C/C++', 'Python', 'Windows/Linux', 'Problem Solving', 'Communication'],
                datasets: [{
                    label: 'Skill Level',
                    data: [85, 75, 80, 90, 85],
                    backgroundColor: 'rgba(168, 85, 247, 0.5)',
                    borderColor: 'rgba(168, 85, 247, 1)',
                    pointBackgroundColor: '#60a5fa',
                    borderWidth: 2,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: 'rgba(168, 85, 247, 1)',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255,255,255,0.1)' },
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        pointLabels: { color: '#cbd5e1', font: { size: 12 } },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
});
