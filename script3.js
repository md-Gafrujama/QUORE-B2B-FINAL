//  front page solution 


document.addEventListener('DOMContentLoaded', function() {
  // Select all chart canvases within sahidu-cards
  const charts = document.querySelectorAll('.sahidu-card .chart');
  
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
      const ctx = canvas.getContext('2d');
      
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

document.addEventListener("DOMContentLoaded", function () {
  const hiddenElements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver((entries) => {
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
              // Remove animation when element is out of view
              entry.target.classList.remove("show-from-left", "show-from-right");
          }
      });
  }, { threshold: 0.3 });

  hiddenElements.forEach(element => observer.observe(element));
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


