var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
   effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
});

// Initialize WOW.js
new WOW().init();

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav =
      navMenu.contains(event.target) || navToggle.contains(event.target);

    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Close menu on window resize if screen becomes larger
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  //============================================   Portfolio Tab Functionality ============================================//
  const tabBtns = document.querySelectorAll(".tab-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs
      tabBtns.forEach((tab) => tab.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Filter portfolio cards
      portfolioCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (targetTab === "tous" || cardCategory === targetTab) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // Portfolio favorite functionality
  const favoriteButtons = document.querySelectorAll(".card-favorite");

  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
    });
  });

  //============================================   Statistics Rolling Animation ============================================//

  // Function to animate numbers
  function animateNumber(
    element,
    start,
    end,
    duration,
    suffix = "",
    prefix = ""
  ) {
    let startTimestamp = null;

    // Add animating class
    element.classList.add("animating");

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
        element.classList.remove("animating");
      }
    };
    window.requestAnimationFrame(step);
  }

  // Function to parse number from text content
  function parseStatNumber(text) {
    const hasPlus = text.includes("+");
    const hasPercent = text.includes("%");
    const hasM = text.includes("M");

    let prefix = "";
    let suffix = "";
    let multiplier = 1;

    if (text.startsWith("+")) {
      prefix = "+";
    }

    if (hasPlus && !text.startsWith("+")) {
      suffix = "+";
    }

    if (hasPercent) {
      suffix = "%";
    }

    if (hasM) {
      suffix = "M";
      multiplier = 1;
    }

    // Extract the number
    const numberStr = text.replace(/[+%M]/g, "");
    const number = parseInt(numberStr) || 0;

    return {
      number: number,
      prefix: prefix,
      suffix: suffix,
      multiplier: multiplier,
    };
  }

  // Intersection Observer for statistics animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");

        statNumbers.forEach((numberElement, index) => {
          const originalText = numberElement.textContent;
          const parsed = parseStatNumber(originalText);

          // Reset to 0 before animation
          numberElement.textContent = parsed.prefix + "0" + parsed.suffix;

          // Start animation with delay for each number
          setTimeout(() => {
            animateNumber(
              numberElement,
              0,
              parsed.number,
              2000 + index * 200, // 2s base + 200ms delay per item
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
  const statisticsSection = document.querySelector(".statistics");
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

  //============================================   Trust Swiper ============================================//

  const trustSwiper = new Swiper(".trust-swiper", {
    slidesPerView: 5,
    spaceBetween: 16,
    loop: true,
    speed: 5000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: false,
    },
    freeMode: true,
    freeModeMomentum: true,
    // effect: 'fade',
    // fadeEffect: {
    //   crossFade: true
    // },

    // navigation: {
    //   nextEl: ".trust-next",
    //   prevEl: ".trust-prev",
    // },
    // pagination: {
    //   el: ".trust-pagination",
    //   clickable: true,
    // },
    breakpoints: {
      320: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      480: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
  });

  //============================================   jQuery Form Validation ============================================//

  // jQuery Form Validation for parlons form
  $("#parlonsForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      surname: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      email: {
        required: true,
        email: true,
        maxlength: 100,
      },
      message: {
        required: true,
        minlength: 10,
        maxlength: 500,
      },
    },
    messages: {
      name: {
        required: "Veuillez saisir votre nom",
        minlength: "Le nom doit contenir au moins 2 caractères",
        maxlength: "Le nom ne peut pas dépasser 50 caractères",
      },
      surname: {
        required: "Veuillez saisir votre prénom",
        minlength: "Le prénom doit contenir au moins 2 caractères",
        maxlength: "Le prénom ne peut pas dépasser 50 caractères",
      },
      email: {
        required: "Veuillez saisir votre adresse e-mail",
        email: "Veuillez saisir une adresse e-mail valide",
        maxlength: "L'adresse e-mail ne peut pas dépasser 100 caractères",
      },
      message: {
        required: "Veuillez saisir votre message",
        minlength: "Le message doit contenir au moins 10 caractères",
        maxlength: "Le message ne peut pas dépasser 500 caractères",
      },
    },
    errorElement: "span",
    errorClass: "error-message",
    errorPlacement: function (error, element) {
      error.insertAfter(element.parent());
    },
    highlight: function (element) {
      $(element).addClass("error-input");
    },
    unhighlight: function (element) {
      $(element).removeClass("error-input");
    },
    submitHandler: function (form) {
      // Show loading state
      const submitBtn = $(form).find(".form-submit-btn");
      const originalText = submitBtn.text();
      submitBtn.text("Envoi en cours...").prop("disabled", true);

      // Simulate form submission (replace with actual AJAX call)
      setTimeout(function () {
        // Success message
        alert("Merci ! Votre message a été envoyé avec succès.");

        // Reset form
        form.reset();

        // Reset button
        submitBtn.text(originalText).prop("disabled", false);

        // Clear any remaining error states
        $(form).find(".error-input").removeClass("error-input");
        $(form).find(".error-message").remove();
      }, 2000);
    },
  });

  // Real-time validation on input
  $("#parlonsForm input, #parlonsForm textarea").on("blur", function () {
    $(this).valid();
  });
});
let vid = document.getElementById("myVideo");

// Initialize button state when page loads
document.addEventListener('DOMContentLoaded', function() {
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  
  // Set initial state - video autoplays so show pause icon
  if (vid && playIcon && pauseIcon) {
    setTimeout(() => {
      if (!vid.paused) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }, 100);
  }
});

function togglePlayAndPause() {
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  
  if (vid.paused) {
    vid.play();
    // Show pause icon, hide play icon
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    vid.pause();
    // Show play icon, hide pause icon
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
}