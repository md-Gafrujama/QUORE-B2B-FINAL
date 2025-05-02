document.addEventListener('DOMContentLoaded', function() {
  // Web Design Performance Chart
  const webDesignCtx = document.getElementById('webDesignPerformanceChart').getContext('2d');
  new Chart(webDesignCtx, {
      type: 'bar',
      data: {
          labels: ['Responsiveness', 'Load Speed', 'User Experience', 'Conversion Rate', 'SEO Optimization'],
          datasets: [{
              label: 'Performance Metrics (%)',
              data: [98, 92, 95, 87, 94],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(153, 102, 255, 0.7)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              title: {
                  display: true,
                  text: 'Web Design Performance Metrics',
                  font: {
                      family: 'Quicksand',
                      size: 16,
                      weight: 'bold'
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                      stepSize: 20,
                      callback: function(value) {
                          return value + '%';
                      }
                  },
                  grid: {
                      drawBorder: false
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          }
      }
  });

  // Client Satisfaction Pie Chart
  const satisfactionCtx = document.getElementById('clientSatisfactionChart').getContext('2d');
  new Chart(satisfactionCtx, {
      type: 'pie',
      data: {
          labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
          datasets: [{
              data: [65, 25, 7, 3],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.7)',  // Very Satisfied
                  'rgba(54, 162, 235, 0.7)',  // Satisfied
                  'rgba(255, 206, 86, 0.7)',  // Neutral
                  'rgba(255, 99, 132, 0.7)'   // Dissatisfied
              ]
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              title: {
                  display: true,
                  text: 'Client Satisfaction Survey',
                  font: {
                      family: 'Quicksand',
                      size: 16,
                      weight: 'bold'
                  }
              },
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          let label = context.label || '';
                          if (label) {
                              label += ': ';
                          }
                          label += context.formattedValue + '%';
                          return label;
                      }
                  }
              }
          }
      }
  });
});

  // Animated counter for stats
  document.addEventListener('DOMContentLoaded', function() {
      const statNumbers = document.querySelectorAll('.wd-stat-number');
      
      const animateCount = (element, target) => {
          const duration = 2000;
          const start = 0;
          const increment = target / (duration / 16);
          let current = start;
          
          const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                  clearInterval(timer);
                  current = target;
              }
              
              if (target % 1 === 0) {
                  element.textContent = Math.floor(current);
              } else {
                  element.textContent = current.toFixed(1);
              }
          }, 16);
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const target = entry.target;
                  const count = parseFloat(target.getAttribute('data-count'));
                  animateCount(target, count);
                  observer.unobserve(target);
              }
          });
      }, { threshold: 0.5 });
      
      statNumbers.forEach(number => {
          observer.observe(number);
      });
  });

// Tab functionality for tools section
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.wd-tab-button');
  
  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          tabButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Hide all panes
          document.querySelectorAll('.wd-tab-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show corresponding pane
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });
});

    <!-- <script src="cookies.js"></script> -->