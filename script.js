// Hero Title Animation
document.addEventListener('DOMContentLoaded', function() {
  const heroTitles = document.querySelectorAll('.hero-title');
  
  // Reset all titles
  heroTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(100px)';
  });
  
  // Animate titles in sequence
  function animateTitle(index) {
    if (index >= heroTitles.length) return;
    
    const title = heroTitles[index];
    
    // Slide in
    title.style.transition = 'all 1s ease-out';
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
    
    // If it's the last title, keep it visible
    if (index === heroTitles.length - 1) {
      return;
    }
    
    // Slide out after 1.5 seconds and start next
    setTimeout(() => {
      title.style.opacity = '0';
      title.style.transform = 'translateY(-50px)';
      
      // Start next title
      setTimeout(() => {
        animateTitle(index + 1);
      }, 500);
    }, 1500);
  }
  
  // Start animation after a short delay
  setTimeout(() => {
    animateTitle(0);
  }, 500);
});

// Initialize Particles.js
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#22ab86" },
          shape: { 
            type: ["circle", "triangle", "edge", "polygon", "star"],
            stroke: {
              width: 1,
              color: "#080808"
            },
            polygon: {
              nb_sides: 6
            },
            star: {
              nb_sides: 5
            },
            image: {
              src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNzYxNWE0Ii8+Cjwvc3ZnPgo=",
              width: 10,
              height: 10
            }
          },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#080808",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
        },
        retina_detect: true,
      });

      // Set default light theme
      document.documentElement.setAttribute('data-theme', 'light');

      // Initialize active navigation link on page load
      document.addEventListener('DOMContentLoaded', function() {
        updateActiveNavLink();
      });

      // Mobile Menu Functionality
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileNavOverlay = document.getElementById('mobileNavOverlay');
      const mobileNavSidebar = document.getElementById('mobileNavSidebar');
      const mobileNavClose = document.getElementById('mobileNavClose');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link:not(.dropdown-toggle), .mobile-dropdown-link');

      function openMobileMenu() {
        mobileNavOverlay.classList.add('active');
        mobileNavSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Change hamburger to X
        const menuIcon = mobileMenuBtn.querySelector('i');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      }

      function closeMobileMenu() {
        mobileNavOverlay.classList.remove('active');
        mobileNavSidebar.classList.remove('active');
        document.body.style.overflow = '';
        
        // Change X back to hamburger
        const menuIcon = mobileMenuBtn.querySelector('i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }

      // Mobile menu event listeners
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
          if (mobileNavSidebar.classList.contains('active')) {
            closeMobileMenu();
          } else {
            openMobileMenu();
          }
        });
      }

      if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
      }

      if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
      }

      // Close mobile menu when clicking on nav links
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
          // Only close and scroll for actual links, not dropdown toggles
          if (!this.classList.contains('dropdown-toggle')) {
            closeMobileMenu();
            // Smooth scroll to section
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
              const target = document.querySelector(href);
              if (target) {
                setTimeout(() => {
                  target.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }
            }
          }
        });
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavSidebar.classList.contains('active')) {
          closeMobileMenu();
        }
      });

      // Enhanced Navbar scroll effect with active link highlighting
      window.addEventListener("scroll", function () {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        
        // Update active navigation links based on scroll position
        updateActiveNavLink();
      });

      // Function to update active navigation links
      function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav-link[href^="#"]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for navbar height
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section's nav link
        if (currentSection) {
          const activeLinks = document.querySelectorAll(`a[href="#${currentSection}"]`);
          activeLinks.forEach(link => {
            if (link.classList.contains('nav-link') || link.classList.contains('mobile-nav-link')) {
              link.classList.add('active');
            }
          });
        }
      }

      // Enhanced smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const navbar = document.getElementById("navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
            
            // Update active state immediately
            setTimeout(updateActiveNavLink, 100);
          }
        });
      });

      // Form submission
      const contactForm = document.querySelector(".contact-form");
      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Thank you for your message! We will get back to you soon.");
          contactForm.reset();
        });
      }

      // Simple animation on scroll
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      }, observerOptions);

      document
        .querySelectorAll(".glass-card, .service-card, .stat-item, .partner-logo")
        .forEach((card) => {
          observer.observe(card);
        });

      // Smooth Scrolling Animation for Testimonials and Services
      function initializeInfiniteScroll() {
        const testimonialsContainer = document.querySelector('.testimonials-container');
        const testimonialsTrack = document.querySelector('.testimonials-track');
        const servicesContainer = document.querySelector('.services-container');
        const servicesTrack = document.querySelector('.services-track');
        
        const isMobile = window.innerWidth <= 768;
        
        // Testimonials Animation
        if (testimonialsContainer && testimonialsTrack) {
          let testimonialsPosition = 0;
          let testimonialsSpeed = isMobile ? 0.06 : 0.08; // Slower for smoother animation
          let testimonialsTargetSpeed = testimonialsSpeed;
          let testimonialsAnimationId;
          
          function animateTestimonials() {
            // Smooth speed transition
            testimonialsSpeed += (testimonialsTargetSpeed - testimonialsSpeed) * 0.03;
            
            // Move position
            testimonialsPosition -= testimonialsSpeed;
            
            // Reset position when it reaches -66.67% (2/3 through the content for seamless loop)
            if (testimonialsPosition <= -66.67) {
              testimonialsPosition = 0;
            }
            
            testimonialsTrack.style.transform = `translateX(${testimonialsPosition}%)`;
            testimonialsAnimationId = requestAnimationFrame(animateTestimonials);
          }
          
          testimonialsContainer.addEventListener('mouseenter', () => {
            testimonialsTargetSpeed = isMobile ? 0.02 : 0.02; // Much slower on hover
          });
          
          testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialsTargetSpeed = isMobile ? 0.06 : 0.08; // Back to normal speed
          });
          
          // Start testimonials animation
          animateTestimonials();
        }
        
        // Services Animation (opposite direction)
        if (servicesContainer && servicesTrack && isMobile) {
          let servicesPosition = -66.67; // Start from 2/3 right
          let servicesSpeed = 0.055; // Slower for smoother animation
          let servicesTargetSpeed = servicesSpeed;
          let servicesAnimationId;
          
          function animateServices() {
            // Smooth speed transition
            servicesSpeed += (servicesTargetSpeed - servicesSpeed) * 0.03;
            
            // Move position (opposite direction)
            servicesPosition += servicesSpeed;
            
            // Reset position when it reaches 0% (completed the loop)
            if (servicesPosition >= 0) {
              servicesPosition = -66.67;
            }
            
            servicesTrack.style.transform = `translateX(${servicesPosition}%)`;
            servicesAnimationId = requestAnimationFrame(animateServices);
          }
          
          servicesContainer.addEventListener('mouseenter', () => {
            servicesTargetSpeed = 0.018; // Much slower on hover
          });
          
          servicesContainer.addEventListener('mouseleave', () => {
            servicesTargetSpeed = 0.055; // Back to normal speed
          });
          
          // Start services animation
          animateServices();
        }
      }
      
      // Initialize on load
      initializeInfiniteScroll();
      
      // Reinitialize on window resize
      window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        // Only reload if switching between mobile and desktop
        if ((window.innerWidth <= 768) !== (window.lastWidth <= 768)) {
          window.lastWidth = window.innerWidth;
          location.reload();
        }
      });
      
      window.lastWidth = window.innerWidth;

      // Navigation Dropdown Functionality
      
      // Desktop dropdown functionality
      const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
      
      dropdownItems.forEach(item => {
        const dropdownToggle = item.querySelector('.dropdown-toggle');
        const dropdownMenu = item.querySelector('.dropdown-menu');
        let hoverTimeout;
        
        // Mouse enter - show dropdown with delay
        item.addEventListener('mouseenter', function() {
          clearTimeout(hoverTimeout);
          item.classList.add('active');
          dropdownToggle.setAttribute('aria-expanded', 'true');
        });
        
        // Mouse leave - hide dropdown with delay
        item.addEventListener('mouseleave', function() {
          hoverTimeout = setTimeout(() => {
            item.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
          }, 150);
        });
        
        // Click functionality for accessibility
        dropdownToggle.addEventListener('click', function(e) {
          e.preventDefault();
          const isActive = item.classList.contains('active');
          
          // Close all other dropdowns
          dropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              otherItem.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
          });
          
          // Toggle current dropdown
          if (isActive) {
            item.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            dropdownToggle.setAttribute('aria-expanded', 'true');
          }
        });
        
        // Keyboard navigation
        dropdownToggle.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdownToggle.click();
          } else if (e.key === 'Escape') {
            item.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            dropdownToggle.focus();
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            item.classList.add('active');
            dropdownToggle.setAttribute('aria-expanded', 'true');
            const firstLink = dropdownMenu.querySelector('.dropdown-link');
            if (firstLink) firstLink.focus();
          }
        });
        
        // Dropdown link keyboard navigation
        const dropdownLinks = item.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach((link, index) => {
          link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const nextLink = dropdownLinks[index + 1];
              if (nextLink) {
                nextLink.focus();
              } else {
                dropdownLinks[0].focus(); // Loop to first
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              const prevLink = dropdownLinks[index - 1];
              if (prevLink) {
                prevLink.focus();
              } else {
                dropdownLinks[dropdownLinks.length - 1].focus(); // Loop to last
              }
            } else if (e.key === 'Escape') {
              item.classList.remove('active');
              dropdownToggle.setAttribute('aria-expanded', 'false');
              dropdownToggle.focus();
            } else if (e.key === 'Tab' && !e.shiftKey) {
              // Allow normal tab navigation to next dropdown
              if (index === dropdownLinks.length - 1) {
                item.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
              }
            }
          });
        });
      });
      
      // Mobile dropdown functionality
      const mobileDropdownItems = document.querySelectorAll('.mobile-nav-item.dropdown');
      
      mobileDropdownItems.forEach(item => {
        const dropdownToggle = item.querySelector('.dropdown-toggle');
        const dropdownContent = item.querySelector('.mobile-dropdown-content');
        
        dropdownToggle.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all other mobile dropdowns
          mobileDropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              otherItem.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
          });
          
          // Toggle current dropdown
          if (isActive) {
            item.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            dropdownToggle.setAttribute('aria-expanded', 'true');
          }
        });
        
        // Close mobile dropdown when clicking on dropdown links
        const mobileDropdownLinks = item.querySelectorAll('.mobile-dropdown-link');
        mobileDropdownLinks.forEach(link => {
          link.addEventListener('click', function() {
            // Close mobile menu
            closeMobileMenu();
            
            // Smooth scroll to section
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
              const target = document.querySelector(href);
              if (target) {
                setTimeout(() => {
                  target.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }
            }
          });
        });
      });
      
      // Close dropdowns when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
          dropdownItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
          });
        }
      });
      
      // Close dropdowns on window resize
      window.addEventListener('resize', function() {
        dropdownItems.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
      });

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      validateAndSubmitForm();
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });
  }
});

function validateField(field) {
  const errorElement = document.getElementById(field.name + '-error');
  let isValid = true;
  let errorMessage = '';

  // Remove existing error state
  field.classList.remove('error');
  if (errorElement) {
    errorElement.classList.remove('show');
    errorElement.textContent = '';
  }

  // Check if field is required and empty
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = `${field.labels[0].textContent.replace(' *', '')} is required`;
  }
  
  // Email validation
  else if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Phone validation (basic)
  else if (field.type === 'tel' && field.value.trim()) {
    const phoneRegex = /^[\+]?[1-9]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }

  if (!isValid) {
    field.classList.add('error');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }
  }

  return isValid;
}

function validateAndSubmitForm() {
  const form = document.getElementById('contactForm');
  const requiredFields = form.querySelectorAll('input[required], textarea[required]');
  let isFormValid = true;

  // Validate all required fields
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  // Also validate optional fields that have values
  const optionalFields = form.querySelectorAll('input:not([required]), textarea:not([required])');
  optionalFields.forEach(field => {
    if (field.value.trim()) {
      if (!validateField(field)) {
        isFormValid = false;
      }
    }
  });

  if (isFormValid) {
    // Show loading state
    const submitBtn = form.querySelector('.btn-contact-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  } else {
    // Focus on first error field
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
    }
  }
}

// Map Toggle Functionality
function toggleMap() {
  const mapPlaceholder = document.querySelector('.map-placeholder');
  const googleMap = document.getElementById('googleMap');
  const toggleBtn = document.querySelector('.btn-map-toggle');
  
  if (googleMap.style.display === 'none') {
    mapPlaceholder.style.display = 'none';
    googleMap.style.display = 'block';
    toggleBtn.innerHTML = '<i class="fas fa-times"></i> Close Map';
  } else {
    mapPlaceholder.style.display = 'block';
    googleMap.style.display = 'none';
    toggleBtn.innerHTML = '<i class="fas fa-map"></i> View on Map';
  }
}