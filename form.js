document.addEventListener('DOMContentLoaded', function() {
  const goalSelect = document.getElementById('nur-goal-select');
  const addGoalBtn = document.getElementById('nur-add-goal-btn');
  const selectedGoalsDisplay = document.getElementById('nur-selected-goals-display');
  const selectedGoalsInput = document.getElementById('nur-selected-goals');
  const checkboxes = document.querySelectorAll('input[name="goals_checkbox[]"]');
  const loadingSpinner = document.querySelector('.anna-loading');
  const form = document.getElementById('nur-lead-form');
  const inlineThankYouSection = document.getElementById('anna-inline-thank-you');
  const inlineThankYouName = document.getElementById('inline-thank-you-name');
  
  let selectedGoals = [];
  
  // Add goal from select dropdown
  addGoalBtn.addEventListener('click', function() {
    const selectedValue = goalSelect.value;
    if (selectedValue && !selectedGoals.includes(selectedValue)) {
      selectedGoals.push(selectedValue);
      updateSelectedGoalsDisplay();
      goalSelect.value = '';
    }
  });
  
  // Add goal when pressing Enter in select
  goalSelect.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addGoalBtn.click();
    }
  });
  
  // Update checkboxes when goals are added/removed
  function updateCheckboxes() {
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectedGoals.includes(checkbox.value);
    });
  }
  
  // Update the visual display of selected goals
  function updateSelectedGoalsDisplay() {
    selectedGoalsDisplay.innerHTML = '';
    selectedGoalsInput.value = selectedGoals.join(', ');
    
    selectedGoals.forEach((goal, index) => {
      const goalElement = document.createElement('div');
      goalElement.className = 'anna-selected-goal';
      goalElement.innerHTML = `
        ${goal}
        <button class="anna-remove-goal" data-index="${index}">&times;</button>
      `;
      selectedGoalsDisplay.appendChild(goalElement);
    });
    
    updateCheckboxes();
  }
  
  // Remove goal when X is clicked
  selectedGoalsDisplay.addEventListener('click', function(e) {
    if (e.target.classList.contains('anna-remove-goal')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      selectedGoals.splice(index, 1);
      updateSelectedGoalsDisplay();
    }
  });
  
  // Sync checkboxes with selected goals
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.checked && !selectedGoals.includes(this.value)) {
        selectedGoals.push(this.value);
      } else if (!this.checked) {
        selectedGoals = selectedGoals.filter(goal => goal !== this.value);
      }
      updateSelectedGoalsDisplay();
    });
  });
  
  // Form submission handling with inline thank you message
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    console.log("Form submission started"); // Debug log
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.anna-submit-btn');
    const userName = document.getElementById('nur-name').value;
    
    // Show loading spinner, hide button
    submitBtn.style.display = 'none';
    loadingSpinner.style.display = 'flex';
    
    console.log("Sending request to:", form.action); // Debug log
    console.log("Form data:", Object.fromEntries(formData.entries())); // Debug log
    
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      console.log("Response status:", response.status); // Debug log
      if (!response.ok) {
        throw new Error(  `HTTP error! status:  ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Full response data:", data);
      loadingSpinner.style.display = 'none';
      
      // Show the thank you message below the button
      inlineThankYouName.textContent = userName;
      inlineThankYouSection.style.display = 'block';
      
      // Scroll to the thank you message
      inlineThankYouSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Reset form fields but keep the thank you message visible
      form.reset();
      selectedGoals = [];
      updateSelectedGoalsDisplay();
      
      // Re-display the submit button in case the user wants to submit another form
      submitBtn.style.display = 'block';
    })
    .catch(error => {
      console.error('Full error:', error); // Debug log
      loadingSpinner.style.display = 'none';
      const successMessage = document.querySelector('.anna-success-message');
      successMessage.textContent = 'There was an error submitting the form. Please try again.';
      successMessage.style.display = 'block';
      submitBtn.style.display = 'block';
    });
  });
});