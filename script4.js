
    document.addEventListener('DOMContentLoaded', function () {
    // *** WEB3FORMS CONFIGURATION - REPLACE THESE VALUES ***
    // Replace with your actual Web3Forms access key
    const WEB3FORMS_ACCESS_KEY = "e505fedc-14ad-49ed-834f-32cd23ad6136"; 
    // *** END WEB3FORMS CONFIGURATION ***
    
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const jobTitleField = document.getElementById('job-title-field');
    const applicationForm = document.getElementById('application-form');
    const formStatus = document.getElementById('form-status');
    const jobDescriptionSection = document.getElementById('job-description-section');
    const jobDescriptionTitle = document.getElementById('job-description-title');
    const jobDescriptionContent = document.getElementById('job-description-content');

    // Job descriptions data
    const jobDescriptions = {
        "Lead Generation Executive": {
            title: "Lead Generation Executive",
            description: `
                <p>We are looking for a highly motivated and results-driven Lead Generation Executive to join our team. The ideal candidate will have a minimum of 6 months’ experience in lead generation and possess excellent interpersonal communication skills. In this role, you will be responsible for identifying potential leads, building strong relationships with prospective clients, and driving new business opportunities. Your ability to engage with prospects and effectively communicate the value of our products/services will be key to achieving success in this position. If you are passionate about lead generation and are eager to contribute to the growth of a dynamic team, we would love to hear from you.</h3>
                    <ul>
  <li><strong>Function:</strong> Lead Generation Executive</li>
  <li><strong>Lead Generation</strong></li>
  <li><strong>Interpersonal Communication</strong></li>
  <li>Hiring Lead Generation Executive with minimum 6 months’ experience in lead generation</li>
</ul>

                <ul>
                    <li>Making cold calls to International (US) Prospects and pitching IT products/services.</li>
                    <li>Should know how to do contact discovery/research.</li>
                    <li>Retrieving Business Contact Information through variety of search engines (LinkedIn, Zoom Info, Hoovers, etc.</li>
                </ul>
                <h3>Required Experience, Skills and Qualifications:</h3>
                <ul>
                    <li>Experience: 6 months to 5 Years in B2B Lead Generation.</li>
                    <li>Must Possess Excellent communication skills.</li>
                    <li>Qualification: 12th / Graduate.</li>
                    <li>Ability to work independently and as part of a team.</li>
                </ul>
            `
        },
        "Data Analyst - B2B Lead Generation": {
            title: "Data Analyst - B2B Lead Generation",
            description: `
                <p>This role involves utilizing data analysis skills to identify and qualify potential B2B leads, optimize lead generation strategies, and provide data-driven insights to the sales and marketing teams. </p>
                <h3>Responsibilities:</h3>
                <ul>
                    <li>Data Collection and Analysis:li>
                    <li>Gather and analyze data from various sources, including CRM systems, marketing automation platforms, and external databases.</li>
                    <li>Clean, preprocess, and validate data to ensure accuracy and consistency. .</li>
                    <li>Identify patterns, trends, and opportunities within the data to inform lead generation efforts .</li>
                    <li>Develop and maintain databases and dashboards to track lead generation metrics and key performance indicators (KPIs).</>

                </ul>
                <h3>Requirements:</h3>
                <ul>
                   <li>Experience: 6 months to 5 Years in B2B Lead Generation.</li>
                    <li>Must Possess Excellent communication skills.</li>
                    <li>Qualification: 12th / Graduate.</li>
                    <li>Ability to work independently and as part of a team.</li>
                </ul>
            `
        }
    };

    // Add hover effects to job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.view-details').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.view-details').style.transform = 'scale(1)';
        });
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.card-title').style.color = 'black';
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.card-title').style.color = 'black';
        });
    });

    // Handle "View details" button clicks
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the job URL and title from the data attributes
            const jobUrl = this.getAttribute('data-job-url');
            const jobTitle = this.getAttribute('data-job-title') || 'General Application';

            // Update the hidden job title field in the form
            if (jobTitleField) {
                jobTitleField.value = jobTitle;
            }

            // Create a pulse effect on the button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Update the job description section
            const jobDescription = jobDescriptions[jobTitle];
            if (jobDescription) {
                jobDescriptionTitle.textContent = jobDescription.title;
                
                // Add the job description content and "Apply Now" button
                jobDescriptionContent.innerHTML = jobDescription.description + `
                    <div class="apply-button-container" style="margin-top: 30px; text-align: center;">
                        <button id="apply-now-btn" class="apply-now-btn" 
                                style="padding: 12px 30px; background: linear-gradient(90deg, #d9eb72, #00D4A4); color: white; 
                                border: none; border-radius:35px; font-size: 16px; font-weight: bold; 
                                cursor: pointer; transition: all 0.3s ease;">
                            Apply Now
                        </button>
                    </div>
                `;
                
                jobDescriptionSection.style.display = 'block';
                
                // Add event listener to the new Apply Now button
                document.getElementById('apply-now-btn').addEventListener('click', function() {
                    // Scroll to application form
                    document.querySelector('.application-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update the form title to highlight the job
                    const sectionTitle = document.querySelector('.section-title');
                    sectionTitle.innerHTML = `Apply Now: <span style="color: #00d8a6;">${jobTitle}</span>`;
                    
                    // Create a pulse effect on the form
                    const formContainer = document.querySelector('.application-container');
                    formContainer.style.boxShadow = '0 0 20px rgba(0, 216, 166, 0.5)';
                    setTimeout(() => {
                        formContainer.style.boxShadow = 'none';
                    }, 1000);
                });
            }

            // Scroll to the job description section with smooth effect
            jobDescriptionSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Add form field animations
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateX(5px)';
            setTimeout(() => {
                this.parentElement.style.transform = 'translateX(0)';
            }, 300);
        });
    });

    // Add hidden Web3Forms access key input to the form
    const accessKeyInput = document.createElement('input');
    accessKeyInput.type = 'hidden';
    accessKeyInput.name = 'access_key';
    accessKeyInput.value = WEB3FORMS_ACCESS_KEY;
    applicationForm.appendChild(accessKeyInput);

    // Handle form submission with Web3Forms
    applicationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        formStatus.style.display = 'none';

        // Show loading state on submit button
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Create FormData object
        const formData = new FormData(applicationForm);

        // Submit the form using Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            
            if (response.status == 200) {
                // Success case
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<strong>Thanks for your application!</strong> We will be in touch soon.';
                applicationForm.reset();

                // Add a confetti effect
                addConfetti();
            } else {
                // Error case
                formStatus.className = 'form-status error';
                formStatus.innerHTML =` <strong>Error:</strong> ${json.message || 'Something went wrong. Please try again.'}`;
                console.error('Web3Forms error:', json);
            }
        })
        .catch(error => {
            // Network or other error
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '<strong>Error:</strong> Network error. Please check your connection and try again.';
            console.error('Fetch error:', error);
        })
        .finally(function() {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show status with animation
            formStatus.style.display = 'block';
            formStatus.style.opacity = '0';
            setTimeout(() => {
                formStatus.style.opacity = '1';
            }, 10);
        });
    });

    // Simple confetti effect function
    function addConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);
        const colors = ['#0d6eaa', '#76b729', '#f8d258', '#ff6b6b', '#8c52ff'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];

            confetti.style.position = 'absolute';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random() + 0.5;

            confettiContainer.appendChild(confetti);

            const animationDuration = Math.random() * 3 + 2;
            const horizonalMovement = (Math.random() - 0.5) * 200;

            confetti.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${horizonalMovement}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                fill: 'forwards'
            });

            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }

        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
