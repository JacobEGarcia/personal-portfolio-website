/**
 * script.js
 * Contains interactivity for dark/light mode toggle, smooth scrolling,
 * progress bar update, project filtering, lazy loading, basic toast notifications,
 * and placeholder code for advanced interactivity features.
 */

// Dark/Light Mode Toggle with system preference detection
const modeToggle = document.getElementById('modeToggle');
const toggleIcon = modeToggle.querySelector('.toggle-icon');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  document.body.classList.remove('dark-mode', 'light-mode');
  document.body.classList.add(theme);
  toggleIcon.textContent = theme === 'dark-mode' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

// Initialize theme
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  setTheme(storedTheme);
} else {
  setTheme(prefersDarkScheme.matches ? 'dark-mode' : 'light-mode');
}

modeToggle.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
  setTheme(newTheme);
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

// Reading Progress Bar
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + "%";
});

// Floating "Back to Top" Button
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Portfolio Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    projects.forEach(project => {
      const category = project.getAttribute('data-category');
      project.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
    });
  });
});

// Basic Search Functionality for Blog Posts
const searchInput = document.getElementById('siteSearch');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const posts = document.querySelectorAll('.blog-post');
  posts.forEach(post => {
    post.style.display = post.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
});

// Contact Form Validation and Toast Notification (basic)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  // Placeholder: Validate form fields here
  showToast('Thank you for your message! We will be in touch soon.');
  contactForm.reset();
});

// Toast Notification Function (basic implementation)
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add('visible'); }, 100);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Lazy Loading Images using IntersectionObserver
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => observer.observe(img));
}
initLazyLoading();

// Placeholder: Advanced Interactivity Features
// For example, infinite scroll, animated reveal on scroll, and dynamic page transitions can be integrated here
// by replacing these placeholders with libraries like IntersectionObserver (for reveal) and others.

