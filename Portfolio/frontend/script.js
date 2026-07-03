const tickerInput = document.getElementById('tickerInput');
const addBtn = document.getElementById('addBtn');
const runBtn = document.getElementById('runBtn');
const stockList = document.getElementById('stockList');
const ctx = document.getElementById('myChart').getContext('2d');

let stocks = [];
let chartInstance = null;

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

runBtn.addEventListener('click', async () => {
    if (stocks.length < 2) {
        alert("Please enter at least 2 stocks!");
        return;
    }

    const originalText = runBtn.textContent;
    runBtn.textContent = "Calculating...";
    runBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:8000/optimize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tickers: stocks })
        });

        if (!response.ok) throw new Error("Backend connection failed!");

        const realData = await response.json();
        drawChart(realData.randomPortfolios, realData.optimalPortfolio);

    } catch (error) {
        console.error("Error:", error);
        alert("Server connect nahi hua! Python backend chalu karein.");
    } finally {
        runBtn.textContent = originalText;
        runBtn.disabled = false;
    }
});

function drawChart(randomData, optimalData) {
    if (chartInstance) chartInstance.destroy();

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