// Utility function to safely query elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return element;
}

// Check if Chart.js is loaded
function isChartJsLoaded() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Please include Chart.js library.');
        return false;
    }
    return true;
}

//  front page solution 
document.addEventListener('DOMContentLoaded', function() {
    if (!isChartJsLoaded()) return;

    // Select all chart canvases within sahidu-cards
    const charts = document.querySelectorAll('.sahidu-card .chart');
    if (charts.length === 0) {
        console.warn('No chart elements found with class .sahidu-card .chart');
        return;
    }
    
    // Generate more initial data points (12 months of data)
    function generateInitialData(baseValue) {
        const data = [];
        let currentValue = baseValue;
        for (let i = 0; i < 12; i++) {
            currentValue += (Math.random() - 0.5) * 15;
            currentValue = Math.min(Math.max(currentValue, 0), 100);
            data.push(currentValue);
        }
        return data;
    }

    const chartConfigs = [
        {
            label: 'Content Reach',
            data: generateInitialData(50),
            color: '#007bff'
        },
        {
            label: 'Qualified Leads',
            data: generateInitialData(40),
            color: '#28a745'
        },
        {
            label: 'Intent Signals',
            data: generateInitialData(60),
            color: '#dc3545'
        },
        {
            label: 'Email Performance',
            data: generateInitialData(45),
            color: '#ffc107'
        }
    ];

    // Create and store chart instances
    const chartInstances = [];

    // Generate month labels for the past year
    const monthLabels = [];
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        monthLabels.push(date.toLocaleString('default', { month: 'short' }));
    }

    charts.forEach((canvas, index) => {
        if (index >= chartConfigs.length) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Make canvas larger
        canvas.style.height = '400px';  // Increased height
        canvas.style.width = '100%';    // Full width
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: chartConfigs[index].label,
                    data: chartConfigs[index].data,
                    borderColor: chartConfigs[index].color,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: `${chartConfigs[index].color}20`,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#666',
                            padding: 10,
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#666',
                            padding: 10,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
        chartInstances.push(chart);

        // Add resize observer for each chart
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                chart.resize();
            }
        });

        resizeObserver.observe(canvas.parentElement);
    });

    // Function to generate new random data point
    function generateNewValue(lastValue) {
        const change = (Math.random() - 0.5) * 10; // Reduced volatility
        let newValue = lastValue + change;
        return Math.min(Math.max(newValue, 0), 100);
    }

    // Function to update charts
    function updateCharts() {
        chartInstances.forEach((chart, index) => {
            const data = chart.data.datasets[0].data;
            const lastValue = data[data.length - 1];
            const newValue = generateNewValue(lastValue);
            
            // Update data and labels
            data.push(newValue);
            if (data.length > 30) { // Keep last 30 points
                data.shift();
            }

            const currentDate = new Date();
            const newLabel = currentDate.toLocaleString('default', { month: 'short' });
            
            chart.data.labels.push(newLabel);
            if (chart.data.labels.length > 30) {
                chart.data.labels.shift();
            }

            chart.update('none');
        });
    }

    // Update charts every 5 seconds
    setInterval(updateCharts, 5000);

    // Handle dark mode changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateChartsTheme(isDark) {
        chartInstances.forEach(chart => {
            const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            const tickColor = isDark ? '#888' : '#666';

            chart.options.scales.y.grid.color = gridColor;
            chart.options.scales.x.grid.color = gridColor;
            chart.options.scales.y.ticks.color = tickColor;
            chart.options.scales.x.ticks.color = tickColor;
            chart.update();
        });
    }

    // Initial theme setup
    updateChartsTheme(darkModeMediaQuery.matches);

    // Listen for theme changes
    darkModeMediaQuery.addEventListener('change', (e) => {
        updateChartsTheme(e.matches);
    });
});

// contentSyndication 
const contentSyndicationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("con-content-left")) {
                entry.target.classList.add("show-from-left");
            } else if (entry.target.classList.contains("right-con-content")) {
                entry.target.classList.add("show-from-right");
            } else if (entry.target.classList.contains("con-image-container-right")) {
                entry.target.classList.add("show-from-right");
            } else if (entry.target.classList.contains("con-image-container-left")) {
                entry.target.classList.add("show-from-left");
            }
        } else {
            entry.target.classList.remove("show-from-left", "show-from-right");
        }
    });
}, { threshold: 0.3 });

document.addEventListener("DOMContentLoaded", function () {
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(element => contentSyndicationObserver.observe(element));
});

//SQL
let mansiLeadGraph;
function createMansiChart() {
    if (!isChartJsLoaded()) return;

    const canvas = safeQuerySelector('#mansi-lead-graph');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (mansiLeadGraph) {
        mansiLeadGraph.destroy();
    }

    mansiLeadGraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Leads Generated',
                data: [12, 19, 3, 5, 2, 3, 10],
                backgroundColor: '#00d8a6',
                borderColor: '#00d8a6',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    });
}

// Initialize Mansi chart and handlers
document.addEventListener('DOMContentLoaded', function () {
    createMansiChart();

    const ctaButton = safeQuerySelector('#mansi-cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (event) {
            event.preventDefault();
            alert('Thank you for starting the conversion process!');
        });
    }

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createMansiChart, 100);
    });

    // Visibility observer for Mansi chart
    const chartElement = safeQuerySelector('#mansi-lead-graph');
    if (chartElement) {
        const mansiChartObserver = new IntersectionObserver(
            entries => entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createMansiChart();
                }
            }),
            { threshold: 0.5 }
        );
        mansiChartObserver.observe(chartElement);
    }
});

// Transform animations
const transformObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("left")) {
                entry.target.classList.add("show-from-left");
            } else if (entry.target.classList.contains("right")) {
                entry.target.classList.add("show-from-right");
            }
        } else {
            entry.target.classList.remove("show-from-left", "show-from-right");
        }
    });
}, { threshold: 0.3 });

document.addEventListener("DOMContentLoaded", function () {
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(element => transformObserver.observe(element));
});

//INTENT LEADS 
const intentLeadsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bushraNumbers = document.querySelectorAll('.bushra-stat-number');
            bushraNumbers.forEach(animateNumber);
            intentLeadsObserver.disconnect();
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = safeQuerySelector('#bushra-stats');
    if (statsSection) {
        intentLeadsObserver.observe(statsSection);
    }
});

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;
    
    let current = 0;
    const increment = target / steps;
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepDuration);
}

// Chat animations
document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.ali-message');
    if (messages.length === 0) return;
    
    function startAnimation() {
        messages.forEach(message => {
            message.classList.remove('visible');
        });
        
        setTimeout(() => {
            messages.forEach(message => {
                setTimeout(() => {
                    message.classList.add('visible');
                }, parseInt(message.dataset.delay) || 0);
            });
        }, 100);
    }

    startAnimation();
    setInterval(startAnimation, 8000);
});



// email markeing sbscribe button 
document.getElementById("subscribeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(this);
    const subscribeButton = document.getElementById("subscribeButton");
    const messageText = document.getElementById("message");
  
    // Disable button & change text
    subscribeButton.innerText = "Subscribing...";
    subscribeButton.disabled = true;
  
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                subscribeButton.innerText = "Subscribed";
                messageText.style.display = "block"; // Show success message
            } else {
                subscribeButton.innerText = "Subscribe";
                subscribeButton.disabled = false;
                messageText.innerText = "Error! Try again.";
                messageText.style.color = "red";
                messageText.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            subscribeButton.innerText = "Subscribe";
            subscribeButton.disabled = false;
            messageText.innerText = "Something went wrong!";
            messageText.style.color = "red";
            messageText.style.display = "block";
        });
  });
  
  
  // read more abou 

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

