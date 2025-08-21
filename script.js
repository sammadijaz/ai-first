      // Initialize Particles.js
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#7b06fa" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4585ff",
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

      // Theme Toggle Functionality
      const themeToggle = document.getElementById('themeToggle');
      const mobileThemeToggle = document.getElementById('mobileThemeToggle');
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Initialize theme based on user preference or localStorage
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        // Default to light theme
        document.documentElement.setAttribute('data-theme', 'light');
      }
      
      // Theme toggle function
      function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        return newTheme;
      }
      
      // Theme toggle click handlers
      if (themeToggle) {
        themeToggle.addEventListener('click', function() {
          toggleTheme();
          
          // Add a subtle animation feedback
          themeToggle.style.transform = 'scale(0.95)';
          setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
          }, 150);
        });
      }

      if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
          toggleTheme();
          
          // Add a subtle animation feedback
          mobileThemeToggle.style.transform = 'scale(0.95)';
          setTimeout(() => {
            mobileThemeToggle.style.transform = 'scale(1)';
          }, 150);
        });
      }

      // Mobile Menu Functionality
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileNavOverlay = document.getElementById('mobileNavOverlay');
      const mobileNavSidebar = document.getElementById('mobileNavSidebar');
      const mobileNavClose = document.getElementById('mobileNavClose');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

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
          closeMobileMenu();
          // Smooth scroll to section
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            setTimeout(() => {
              target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }
        });
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavSidebar.classList.contains('active')) {
          closeMobileMenu();
        }
      });

      // Navbar scroll effect
      window.addEventListener("scroll", function () {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
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
        .querySelectorAll(".glass-card, .service-card, .stat-item")
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