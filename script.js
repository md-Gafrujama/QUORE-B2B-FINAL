// Slider functionality
const slider = document.querySelector(".hero-slider");
const slides = document.querySelectorAll(".hero");
const dots = document.querySelectorAll(".dot");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlide = 0;
const slideCount = slides.length;
let autoSlideInterval;

// Initialize first slide
slides[0].classList.add("active");
dots[0].classList.add("active");

function updateSlider() {
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  
  // Move slider
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Add active class to current slide and dot
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  updateSlider();
}

// Start auto slide function
function startAutoSlide() {
  // Clear any existing interval first
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  
  // Set new interval
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 6000); // Change slide every 8 seconds
}

// Event listeners for navigation
prevButton.addEventListener("click", () => {
  prevSlide();
  // Reset timer when manually navigating
  startAutoSlide();
});

nextButton.addEventListener("click", () => {
  nextSlide();
  // Reset timer when manually navigating
  startAutoSlide();
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
    // Reset timer when manually navigating
    startAutoSlide();
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
    startAutoSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
    startAutoSlide();
  }
});

// Touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  // Pause auto-slide during touch interaction
  clearInterval(autoSlideInterval);
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
  // Restart auto-slide after touch interaction
  startAutoSlide();
});

function handleSwipe() {
  const swipeThreshold = 50; // minimum distance for swipe
  const difference = touchStartX - touchEndX;
  
  if (Math.abs(difference) > swipeThreshold) {
    if (difference > 0) {
      // Swipe left
      nextSlide();
    } else {
      // Swipe right
      prevSlide();
    }
  }
}

// Pause auto-slide when hovering over slider
slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

// Resume auto-slide when mouse leaves slider
slider.addEventListener("mouseleave", () => {
  startAutoSlide();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Start auto-slide when page loads
startAutoSlide();

// Ensure the first slide change happens after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Force initial state
  updateSlider();
  
  // Schedule first automatic slide change
  setTimeout(() => {
    nextSlide();
    startAutoSlide(); // Restart the interval after first manual change
  }, 6000);
  
  console.log("Auto-slide initialized and will change slides every 8 seconds");
});

// Additional check for already loaded DOM
if (document.readyState === "complete" || document.readyState === "interactive") {
  // Force initial state
  updateSlider();
  
  // Schedule first automatic slide change
  setTimeout(() => {
    nextSlide();
    startAutoSlide(); // Restart the interval after first manual change
  }, 6000);
  
  console.log("Auto-slide initialized (DOM already loaded)");
}

// Form submission handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Add your form submission logic here
    alert("Form submitted successfully!");
    this.reset();
  });
}

// Initialize first slide
updateSlider();

  // Service cards hover animation
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-10px)";
          card.style.backgroundColor = "#f9f9f9";
      });
      card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
          card.style.backgroundColor = "#ffffff";
      });
  });
  const readMoreBtn = document.getElementById('readMoreBtn');
  readMoreBtn.addEventListener('click', function() {
      this.style.transform = 'translateY(1px)';
      setTimeout(() => {
          this.style.transform = 'translateY(0)';
      }, 100);
  });
  


  function startCounting() {
    document.querySelectorAll('.number').forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(target / 100);
        
        const updateNumber = () => {
            count += increment;
            if (count > target) count = target;
            number.textContent = count;
            if (count < target) requestAnimationFrame(updateNumber);
        };
        requestAnimationFrame(updateNumber);
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => observer.observe(stat));


// ACTIVE LINKS
const currentLocation = window.location.pathname;

// Get all navbar links
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
// Check if the link's href matches the current location
if (link.getAttribute("href") === currentLocation) {
link.classList.add("active");
}
});



