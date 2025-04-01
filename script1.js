// ahmburgguer and active ll in nav bar

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
    const dropdownContents = document.querySelectorAll('.r-dropdown-content');
    const dropdowns = document.querySelectorAll('.r-dropdown');
    const navbar = document.querySelector('#kazim.navbar');

    // Menu toggle functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Add staggered animation to nav items
            navItems.forEach((item, index) => {
                if (navLinks.classList.contains('active')) {
                    item.style.transitionDelay = `${index * 0.1}s`;
                } else {
                    item.style.transitionDelay = '0s';
                }
            });

            // Close all dropdowns when menu is toggled
            dropdownContents.forEach(content => {
                content.classList.remove('active');
            });
            dropdownArrows.forEach(arrow => {
                arrow.classList.remove('active');
            });
        });
    }

    // Hover and mouse events for dropdowns
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.dropdown-link');
        const dropdownContent = dropdown.querySelector('.r-dropdown-content');
        const dropdownArrow = dropdown.querySelector('.dropdown-arrow');

        // Function to open dropdown
        const openDropdown = () => {
            if (window.innerWidth > 968) {
                dropdownContent.classList.add('active');
                dropdownArrow.classList.add('active');
            }
        };

        // Handle dropdown toggles for mobile
        dropdownArrow.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle current dropdown
            dropdownContent.classList.toggle('active');
            this.classList.toggle('active');
            
            // Close other dropdowns
            dropdownContents.forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('active');
                }
            });
            
            dropdownArrows.forEach(arr => {
                if (arr !== this) {
                    arr.classList.remove('active');
                }
            });
        });

        // Hover events for desktop
        dropdown.addEventListener('mouseenter', openDropdown);
    });

    // Add hover persistence for entire navbar
    if (navbar) {
        navbar.addEventListener('mouseleave', function(e) {
            if (window.innerWidth > 968) {
                // Close dropdowns
                dropdownContents.forEach(content => {
                    content.classList.remove('active');
                });
                dropdownArrows.forEach(arrow => {
                    arrow.classList.remove('active');
                });
            }
        });
    }

    // Close menu and dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is outside navigation
        if (navLinks && !navLinks.contains(e.target) && 
            menuToggle && !menuToggle.contains(e.target)) {
            // Close mobile menu
            if (menuToggle) menuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');

            // Close dropdowns
            dropdownContents.forEach(content => {
                content.classList.remove('active');
            });
            dropdownArrows.forEach(arrow => {
                arrow.classList.remove('active');
            });
        }
    });

    // Close mobile menu and dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            // Reset mobile menu
            if (menuToggle) menuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');

            // Reset dropdown styles
            dropdownContents.forEach(content => {
                content.classList.remove('active');
            });
            dropdownArrows.forEach(arrow => {
                arrow.classList.remove('active');
            });
        }
    });

    // Prevent dropdown from closing when clicking inside
    dropdownContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});


// arrow buton 
document.addEventListener("DOMContentLoaded", function () {
    const scrollUpBtn = document.getElementById("scroll-up-btn");
    const scrollDownBtn = document.getElementById("scroll-down-btn");
    const navbar = document.querySelector(".navbar"); 
    const footer = document.getElementById("footer-bottom");

    if (!scrollUpBtn || !scrollDownBtn || !navbar || !footer) {
        console.error("Error: Required elements not found!");
        return;
    }

    console.log("Scroll buttons and elements found!");
    scrollUpBtn.addEventListener("click", function () {
        console.log("Scrolling to the top...");
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(function () {
            location.reload();
        }, 500); 
    });

    scrollDownBtn.addEventListener("click", function () {
        console.log("Scrolling to the bottom (footer)...");
        footer.scrollIntoView({ behavior: "smooth" });
    });

    function updateButtonVisibility() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        console.log("Scroll Position:", scrollPosition);
        console.log("Document Height:", documentHeight);
        console.log("Window Height:", windowHeight);

        if (scrollPosition + windowHeight >= documentHeight - 100) {
            scrollDownBtn.style.display = "none";
            scrollUpBtn.style.display = "block";
        } else if (scrollPosition > 100) {
            scrollUpBtn.style.display = "block";
            scrollDownBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
            scrollDownBtn.style.display = "block";
        }
    }
    window.addEventListener("scroll", updateButtonVisibility);
    updateButtonVisibility();
});


// do not shell
document
.getElementById("contactForm")
.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = document.getElementById("submitButton");

  // Disable button to prevent multiple clicks
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const accessKey = "7106ba70-f32b-45ec-980b-410780296f86"; // Check if this key is correct!

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: JSON.stringify({
        access_key: accessKey,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: `${formData.get("areaCode")}${formData.get(
          "phoneNumber"
        )}`, // FIXED BUG
        companyName: formData.get("companyName"),
        doNotSell: formData.get("doNotSell") ? "Yes" : "No",
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();
    console.log(result); // Debugging: Log response

    if (response.ok) {
      form.style.display = "none";

      // Create the "Thank You" message
      const thankYouMessage = document.createElement("div");
      thankYouMessage.innerHTML = `
<div class="submit_image" style="text-align: center; padding: 20px; border-radius: 10px; height: 300px">
            <img src="image/california.jpg" alt="Success" style="width: 140px; height: auto; margin-bottom: 10px"/>
            <h1>Thank You!</h1>
            <p>Your submission has been received.</p>
        </div>
`;

      // Insert the message into the container
      document
        .querySelector(".form-container")
        .appendChild(thankYouMessage);
      // alert('Form submitted successfully!');
      // form.reset();
    } else {
      alert("Error: " + result.message); // Show detailed error
    }
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting the form. Please try again.");
  }

  //Enable
  submitButton.disabled = false;
  submitButton.textContent = "Submit";
});





