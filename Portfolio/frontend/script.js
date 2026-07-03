// 1. SKILLS RADAR CHART
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('skillsChart');
    
    // Check if canvas exists on page before trying to draw the chart
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
                    borderWidth: 2
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