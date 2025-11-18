var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Initialize WOW.js
new WOW().init();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu on window resize if screen becomes larger
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  //============================================   Portfolio Tab Functionality ============================================//
  const tabBtns = document.querySelectorAll('.tab-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabBtns.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Filter portfolio cards
      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (targetTab === 'tous' || cardCategory === targetTab) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Portfolio favorite functionality
  const favoriteButtons = document.querySelectorAll('.card-favorite');
  
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
    });
  });

  //============================================   Statistics Rolling Animation ============================================//
  
  // Function to animate numbers
  function animateNumber(element, start, end, duration, suffix = '', prefix = '') {
    let startTimestamp = null;
    
    // Add animating class
    element.classList.add('animating');
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(easeOutQuart * (end - start) + start);
      element.textContent = prefix + current + suffix;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = prefix + end + suffix;
        // Remove animating class when done
        element.classList.remove('animating');
      }
    };
    window.requestAnimationFrame(step);
  }

  // Function to parse number from text content
  function parseStatNumber(text) {
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasM = text.includes('M');
    
    let prefix = '';
    let suffix = '';
    let multiplier = 1;
    
    if (text.startsWith('+')) {
      prefix = '+';
    }
    
    if (hasPlus && !text.startsWith('+')) {
      suffix = '+';
    }
    
    if (hasPercent) {
      suffix = '%';
    }
    
    if (hasM) {
      suffix = 'M';
      multiplier = 1;
    }
    
    // Extract the number
    const numberStr = text.replace(/[+%M]/g, '');
    const number = parseInt(numberStr) || 0;
    
    return {
      number: number,
      prefix: prefix,
      suffix: suffix,
      multiplier: multiplier
    };
  }

  // Intersection Observer for statistics animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        
        statNumbers.forEach((numberElement, index) => {
          const originalText = numberElement.textContent;
          const parsed = parseStatNumber(originalText);
          
          // Reset to 0 before animation
          numberElement.textContent = parsed.prefix + '0' + parsed.suffix;
          
          // Start animation with delay for each number
          setTimeout(() => {
            animateNumber(
              numberElement,
              0,
              parsed.number,
              2000 + (index * 200), // 2s base + 200ms delay per item
              parsed.suffix,
              parsed.prefix
            );
          }, index * 300); // 300ms delay between each number
        });
        
        // Unobserve after animation starts
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe the statistics section
  const statisticsSection = document.querySelector('.statistics');
  if (statisticsSection) {
    statsObserver.observe(statisticsSection);
  }

  //============================================   Expertises Swiper ============================================//
  
  const expertisesSwiper = new Swiper(".expertises-swiper", {
    slidesPerView: 4,
    spaceBetween: 32,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".expertises-next",
      prevEl: ".expertises-prev",
    },
    pagination: {
      el: ".expertises-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });
});
