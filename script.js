/**
 * script.js
 * Contains interactivity for dark/light mode toggle, smooth scrolling,
 * progress bar update, project filtering, search functionality, and more.
 */

// Dark/Light Mode Toggle with system preference detection
const modeToggle = document.getElementById('modeToggle');
const toggleIcon = modeToggle.querySelector('.toggle-icon');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  document.body.classList.remove('dark-mode', 'light-mode');
  document.body.classList.add(theme);
  // Update toggle icon
  toggleIcon.textContent = theme === 'dark-mode' ? '🌙' : '☀️';
  // Optionally, store preference in localStorage
  localStorage.setItem('theme', theme);
}

// Initialize theme based on system preference or stored value
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
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Reading Progress Bar
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrolled + "%";
});

// Floating "Back to Top" Button
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Portfolio Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button style
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    projects.forEach(project => {
      const category = project.getAttribute('data-category');
      project.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
    });
  });
});

// Basic Search Functionality for Blog Posts (placeholder)
const searchInput = document.getElementById('siteSearch');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const posts = document.querySelectorAll('.blog-post');
  posts.forEach(post => {
    const text = post.textContent.toLowerCase();
    post.style.display = text.includes(query) ? 'block' : 'none';
  });
});

// Contact Form Validation (basic)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  // Validate form fields here (or integrate with a validation library)
  // For demonstration, display a simple toast notification (placeholder)
  alert('Thank you for your message! We will be in touch soon.');
  contactForm.reset();
});

// Placeholder: Initialize additional features such as infinite scroll,
// lazy loading, analytics integration, toast notifications, and more.
