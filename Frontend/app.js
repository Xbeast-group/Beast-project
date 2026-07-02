const tickerInput = document.getElementById('tickerInput');
const addBtn = document.getElementById('addBtn');
const runBtn = document.getElementById('runBtn');
const stockList = document.getElementById('stockList');
const ctx = document.getElementById('myChart').getContext('2d');

let stocks = [];
let chartInstance = null;

// 1. Add Button ka logic (Same as before)
addBtn.addEventListener('click', () => {
    const stockName = tickerInput.value.toUpperCase();
    if (stockName !== "" && !stocks.includes(stockName)) {
        stocks.push(stockName);
        
        const li = document.createElement('li');
        li.textContent = stockName;
        li.className = "bg-blue-100 px-3 py-1 rounded shadow-sm";
        stockList.appendChild(li);
        
        tickerInput.value = ""; 
    }
});

// 2. Run Button ka naya logic (Backend API se connect karne ke liye)
runBtn.addEventListener('click', async () => {
    if (stocks.length < 2) {
        alert("Bhai, kam se kam 2 stocks toh daalo optimization ke liye!");
        return;
    }

    // Button ko 'Loading' state mein dalna
    const originalText = runBtn.textContent;
    runBtn.textContent = "Calculating Asli Data...";
    runBtn.disabled = true;

    try {
        // Yahan hum Python backend ko stocks ki list bhej rahe hain
        // Note: 'http://localhost:8000/optimize' aapke Python server ka address hoga
        const response = await fetch('http://localhost:8000/optimize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tickers: stocks })
        });

        if (!response.ok) {
            throw new Error("Backend se data nahi aaya!");
        }

        // Python jo asli math karke bhejega, usko yahan receive karenge
        const realData = await response.json();

        // Asli data ko graph par draw karna
        drawChart(realData.randomPortfolios, realData.optimalPortfolio);

    } catch (error) {
        console.error("Error:", error);
        alert("Server connect nahi hua. Please backend chalu karein ya console check karein!");
    } finally {
        // Button ko wapas normal karna
        runBtn.textContent = originalText;
        runBtn.disabled = false;
    }
});

// 3. Graph draw karne ka function (Same as before)
function drawChart(randomData, optimalData) {
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Random Portfolios',
                    data: randomData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    pointRadius: 4
                },
                {
                    label: 'Optimal Portfolio',
                    data: optimalData,
                    backgroundColor: 'red',
                    pointRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Risk (Volatility)' } },
                y: { title: { display: true, text: 'Expected Return' } }
            }
        }
    });
}
