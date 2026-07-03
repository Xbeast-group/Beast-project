/* Sabhi elements ki basic setting */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    /* Yahan background mein Dark Blue aur Purple ka mix (Gradient) hai */
    background: linear-gradient(135deg, #0b132b, #592e71);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Puri screen gherne ke liye */
}

/* Portfolio Card ka design - Glass effect */
.portfolio-card {
    background: rgba(255, 255, 255, 0.05); /* Halka transparent */
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px); /* Peeche ka background blur karega */
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 350px;
}

.portfolio-card h1 {
    margin-bottom: 10px;
    font-size: 24px;
    letter-spacing: 1px;
}

.portfolio-card p {
    margin-bottom: 30px;
    color: #d1d1d1;
    font-size: 14px;
    line-height: 1.5;
}

.links {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Buttons ke beech ki jagah */
}

/* Buttons ka design */
.btn {
    text-decoration: none;
    color: white;
    /* Button ke andar Dark Blue se Purple ka mix */
    background: linear-gradient(90deg, #1c2541, #8a2be2); 
    padding: 12px;
    border-radius: 10px;
    font-weight: bold;
    transition: all 0.3s ease; /* Smooth animation ke liye */
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* Jab mouse button ke upar jayega (Hover effect) */

.btn:hover {
    /* Hover karne par colors ulte ho jayenge */
    background: linear-gradient(90deg, #8a2be2, #1c2541); 
    transform: translateY(-3px);

    /* Button thoda upar uthega */
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4); /* Purple glow */
}