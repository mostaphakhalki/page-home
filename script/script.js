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
});
