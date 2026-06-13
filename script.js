/* =====================================================
   RED BULL RACING F1 PORTFOLIO - INTERACTIVE FEATURES
   ===================================================== */

// =====================================================
// 0. F1 RACE START SPLASH SCREEN (BEFORE PAGE LOAD)
// =====================================================
function playSplashAnimation() {
  return new Promise((resolve) => {
    const splash = document.getElementById('raceSplash');
    const splashLights = document.querySelectorAll('.splash-light');
    
    // Sequence 1: Lights turn red one by one (0.3s each)
    splashLights.forEach((light, index) => {
      setTimeout(() => {
        light.classList.add('red-active');
      }, 300 * (index + 1)); // 300ms per light
    });

    // Sequence 2: All lights glow red for 1 second
    // Total time so far: 1.5s (5 lights * 300ms)
    
    // Sequence 3: All lights turn green at 2.5s
    setTimeout(() => {
      splashLights.forEach((light) => {
        light.classList.remove('red-active');
        light.classList.add('green-active');
      });
    }, 2500);

    // Sequence 4: Fade out splash screen at 4s
    setTimeout(() => {
      splash.classList.add('fade-out');
      // Resolve promise after fade completes
      setTimeout(() => {
        resolve();
      }, 600); // Match the fade-out transition duration
    }, 4000);
  });
}

// Play splash animation on page load
window.addEventListener('load', async () => {
  await playSplashAnimation();
  
  // After splash fades, ensure first flashcard is expanded
  const firstFlashcard = document.querySelector('.flashcard');
  if (firstFlashcard && window.innerWidth > 768) {
    firstFlashcard.classList.add('expanded');
  }
});

// =====================================================
// 1. F1 GRID LIGHTS ANIMATION (Header)
// =====================================================
// =====================================================
// 1. F1 GRID LIGHTS ANIMATION (Header)
// =====================================================
function animateGridLights() {
  const lights = document.querySelectorAll('.pit-wall-header .light');
  
  // Sequence lights turning red (starting race)
  lights.forEach((light, index) => {
    setTimeout(() => {
      light.classList.add('active');
    }, 300 * index);
  });

  // After all red, flash green and transition
  setTimeout(() => {
    lights.forEach((light) => {
      light.classList.remove('active');
      light.classList.add('finished');
    });
    
    // Finish animation and fade
    setTimeout(() => {
      lights.forEach((light) => {
        light.classList.remove('finished');
      });
    }, 500);
  }, 300 * lights.length);
}

// Trigger after splash screen completes (this runs with splash animation)
setTimeout(() => {
  animateGridLights();
}, 4600); // After splash fade-out (4000ms + 600ms fade)

// =====================================================
// 2. TYPING EFFECT FOR HERO SECTION
// =====================================================
const typingTexts = [
  'AI & ML Enthusiast',
  'Backend Web Developer',
  'Data Science Student',
  'Full-Stack Engineer'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingElement = document.querySelector('.typing-text');
  const currentText = typingTexts[currentTextIndex];
  
  if (isDeleting) {
    // Deleting characters
    if (currentCharIndex > 0) {
      currentCharIndex--;
      typingElement.textContent = currentText.substring(0, currentCharIndex);
      setTimeout(typeEffect, 50);
    } else {
      // Move to next text
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      setTimeout(typeEffect, 500);
    }
  } else {
    // Typing characters
    if (currentCharIndex < currentText.length) {
      currentCharIndex++;
      typingElement.textContent = currentText.substring(0, currentCharIndex);
      setTimeout(typeEffect, 80);
    } else {
      // Pause before deleting
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    }
  }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
  setTimeout(typeEffect, 500);
});

// =====================================================
// 3. FULL-SCREEN SECTION NAVIGATION
// =====================================================
const sectionViewer = document.querySelector('.section-viewer');
const sectionTitle = document.getElementById('sectionTitle');
const sectionContent = document.getElementById('sectionContent');
const backButton = document.getElementById('backButton');

// Available sections with their content
const sections = {
  about: {
    title: 'ABOUT ME',
    content: document.querySelector('.section-content[data-section="about"]')
  },
  education: {
    title: 'EDUCATION',
    content: document.querySelector('.section-content[data-section="education"]')
  },
  skills: {
    title: 'TECHNICAL SKILLS',
    content: document.querySelector('.section-content[data-section="skills"]')
  },
  experience: {
    title: 'EXPERIENCE',
    content: document.querySelector('.section-content[data-section="experience"]')
  },
  projects: {
    title: 'PROJECTS',
    content: document.querySelector('.section-content[data-section="projects"]')
  },
  certificates: {
    title: 'CERTIFICATES',
    content: document.querySelector('.section-content[data-section="certificates"]')
  },
  contact: {
    title: 'GET IN TOUCH',
    content: document.querySelector('.section-content[data-section="contact"]')
  }
};

// Function to open a section in full-screen
function openSection(sectionId) {
  const section = sections[sectionId];
  if (!section) return;

  // Update title
  sectionTitle.textContent = section.title;

  // Clone and display content
  if (section.content) {
    sectionContent.innerHTML = section.content.innerHTML;
  }

  // Show viewer
  sectionViewer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Function to close full-screen viewer
function closeSection() {
  sectionViewer.classList.remove('active');
  document.body.style.overflow = '';
}

// Click handlers for section cards
document.querySelectorAll('.flashcard-card').forEach((card) => {
  card.addEventListener('click', () => {
    const sectionId = card.getAttribute('data-section');
    openSection(sectionId);
  });
});

// Back button handler
if (backButton) {
  backButton.addEventListener('click', closeSection);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sectionViewer.classList.contains('active')) {
    closeSection();
  }
});

// Update navigation links to open sections
document.querySelectorAll('.nav-links a[data-section]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    
    // Close mobile menu
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }

    openSection(sectionId);
  });
});

// =====================================================
// 5. DARK MODE TOGGLE
// =====================================================
const darkModeBtn = document.getElementById('dark-mode-toggle');

// Check if dark mode preference is saved
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  darkModeBtn.textContent = '☀️';
}

if (darkModeBtn) {
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
  });
}

// =====================================================
// 6. MOBILE HAMBURGER MENU
// =====================================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when nav link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// =====================================================
// 7. SCROLL TO TOP BUTTON
// =====================================================
const goToTopBtn = document.getElementById('go-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    goToTopBtn.classList.add('show');
  } else {
    goToTopBtn.classList.remove('show');
  }
});

if (goToTopBtn) {
  goToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =====================================================
// 8. DARK MODE STYLES
// =====================================================
const darkModeStyles = `
  body.dark-mode {
    background: #0B1F3F;
    color: #CBD5E1;
  }

  body.dark-mode .pit-wall-header {
    background: rgba(4, 13, 26, 0.98);
  }

  body.dark-mode .nav-links a {
    color: #CBD5E1;
  }

  body.dark-mode .flashcard {
    background: linear-gradient(135deg, rgba(11, 31, 63, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
  }

  body.dark-mode .flashcard-header {
    background: linear-gradient(90deg, rgba(225, 6, 0, 0.15) 0%, rgba(255, 204, 0, 0.08) 100%);
  }

  body.dark-mode .skill-category {
    background: rgba(30, 41, 59, 0.5);
  }

  body.dark-mode .bento-item {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(11, 31, 63, 0.8) 100%);
  }

  body.dark-mode .cert-item {
    background: rgba(30, 41, 59, 0.5);
  }

  body.dark-mode .contact-form input,
  body.dark-mode .contact-form textarea {
    background: rgba(30, 41, 59, 0.6);
    color: #CBD5E1;
    border-color: rgba(255, 204, 0, 0.15);
  }

  body.dark-mode .pit-wall-footer {
    background: linear-gradient(180deg, rgba(4, 13, 26, 0.95) 0%, rgba(11, 31, 63, 0.95) 100%);
  }
`;

// Inject dark mode styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

// =====================================================
// 9. SET FOOTER YEAR
// =====================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =====================================================
// 10. PERFORMANCE OPTIMIZATION - LAZY LOAD ANIMATIONS
// =====================================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all flashcard cards for animation
document.querySelectorAll('.flashcard-card').forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  observer.observe(card);
});

// =====================================================
// 11. KEYBOARD ACCESSIBILITY
// =====================================================
document.addEventListener('keydown', (e) => {
  // Escape key already handled in section viewer
  
  // Home key to scroll to top
  if (e.key === 'Home' && !sectionViewer.classList.contains('active')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // End key to scroll to bottom
  if (e.key === 'End' && !sectionViewer.classList.contains('active')) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// =====================================================
// 12. SMOOTH PAGE TRANSITIONS
// =====================================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Initial page opacity
document.body.style.opacity = '0.95';

// =====================================================
// 13. ENHANCED LINK TRACKING (optional analytics)
// =====================================================
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    // Track external link clicks (optional)
    console.log('External link clicked:', link.href);
  });
});

// =====================================================
// 14. PREFETCH PERFORMANCE - Images and Resources
// =====================================================
// Preload profile image if exists
const profileImg = document.querySelector('.profile-photo');
if (profileImg && profileImg.src) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = profileImg.src;
  document.head.appendChild(link);
}

// =====================================================
// 15. FORM SUBMISSION TRACKING
// =====================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // FormSubmit.co will handle the submission
    // This is just for tracking
    console.log('Contact form submitted');
  });
}

// =====================================================
// 16. INITIAL STATE SETUP
// =====================================================
// Portfolio initialized with full-screen section navigation

console.log('🏁 Red Bull Racing F1 Portfolio loaded successfully!');
console.log('🚀 Ready to accelerate your career!');
