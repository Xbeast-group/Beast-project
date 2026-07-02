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

runBtn.addEventListener('click', () => {
    if (stocks.length < 2) {
        alert("Bhai, kam se kam 2 stocks toh daalo optimization ke liye!");
        return;
    }

    // Mock Data jab tak backend connect nahi hota
    const mockRandomPortfolios = [
        {x: 12, y: 5}, {x: 15, y: 8}, {x: 18, y: 10}, 
        {x: 20, y: 11}, {x: 14, y: 6}, {x: 17, y: 9},
        {x: 13, y: 7}, {x: 19, y: 9.5}, {x: 16, y: 7.5}
    ];
    const mockOptimalPortfolio = [{x: 14, y: 12}]; 

    drawChart(mockRandomPortfolios, mockOptimalPortfolio);
});

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
