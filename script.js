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
      
      // Theme toggle click handler
      if (themeToggle) {
        themeToggle.addEventListener('click', function() {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          
          // Add a subtle animation feedback
          themeToggle.style.transform = 'scale(0.95)';
          setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
          }, 150);
        });
      }

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