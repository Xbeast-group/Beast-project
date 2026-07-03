// HTML Elements ko pakadna
const loginSection = document.getElementById('login-section');
const portfolioSection = document.getElementById('portfolio-section');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

// Login Button Click Event
loginBtn.addEventListener('click', () => {
    const githubId = document.getElementById('github-id').value;
    const username = document.getElementById('username').value;
    
    if(githubId === "" || username === "") {
        alert("Please enter Username and GitHub ID!");
        return;
    }

    // 1. Login Screen Hide karo, Portfolio Show karo
    loginSection.style.display = "none";
    portfolioSection.style.display = "block";

    // 2. GitHub API ko call karo (Real Data Fetching)
    fetch(`https://api.github.com/users/${githubId}`)
        .then(response => {
            if(!response.ok) throw new Error("GitHub user not found");
            return response.json();
        })
        .then(data => {
            // API se jo data aaya, usko HTML mein daalo
            document.getElementById('user-name').innerText = data.name || username;
            document.getElementById('user-bio').innerText = data.bio || "No bio available on GitHub.";
            
            // Profile Photo set karo
            const profilePic = document.getElementById('profile-pic');
            profilePic.src = data.avatar_url;
            profilePic.style.display = "inline-block";

            // Links update karo
            document.getElementById('link-github').href = data.html_url;
        })
        .catch(error => {
            document.getElementById('user-name').innerText = "Error!";
            document.getElementById('user-bio').innerText = error.message;
        });
});

// Logout Button Click Event
logoutBtn.addEventListener('click', () => {
    // Portfolio hide karo, wapas Login show karo
    portfolioSection.style.display = "none";
    loginSection.style.display = "block";
    
    // Input fields clear kar do
    document.getElementById('github-id').value = "";
    document.getElementById('password').value = "";
});