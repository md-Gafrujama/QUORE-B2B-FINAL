// start a new project and are u redy 

document.getElementById("email-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const form = this;
  const statusMessage = document.getElementById("status-message");
  const submitButton = document.getElementById("submit-text");
  
  statusMessage.textContent = "Submitting...";
  submitButton.disabled = true;
  
  fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          statusMessage.textContent = "Thank you! Your email has been submitted successfully.";
          form.reset();
      } else {
          statusMessage.textContent = "Submission failed: " + data.message;
      }
  })
  .catch(error => {
      statusMessage.textContent = "An error occurred. Please try again.";
      console.error(error);
  })
  .finally(() => {
      submitButton.disabled = false;
  });
});



  // Get DOM elements
  const startButton = document.getElementById('start-button');
  const trySection = document.querySelector('.try');
  
  // Function to show the form section with animation
  function showFormSection() {
      // Add fade-in class to the try section
      trySection.classList.add('fade-in');
      
      // Scroll to the form section
      trySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Event listener for Start Now button
  startButton.addEventListener('click', showFormSection);
  
  // Event listener for Submit text button
  submitText.addEventListener('click', function() {
      // If email is entered, copy it to the form
      if (emailInput.value) {
          dEmailInput.value = emailInput.value;
      }
      
      showFormSection();
  });

  

  // Function to handle the page load and check for hash fragments
  window.onload = function() {
    // Check if there's a hash in the URL
    if (window.location.hash === '#contact-form') {
      // Get the form element
      var formElement = document.getElementById('contact-form');
      
      // If found, scroll to it
      if (formElement) {
        // Add a slight delay to ensure everything is loaded
        setTimeout(function() {
          formElement.scrollIntoView({behavior: 'smooth'});
          // Highlight the form with a visual effect (optional)
          formElement.style.animation = 'highlight 2s';
        }, 500);
      }
    }
  };

  // Add this to your CSS or add a style tag with this content
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      @keyframes highlight {
        0% { background-color: rgba(255, 255, 0, 0.3); }
        100% { background-color: transparent; }
      }
    </style>
  `);
