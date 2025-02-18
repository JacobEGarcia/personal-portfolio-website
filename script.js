// Smooth scrolling for navigation
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    // If section is found, scroll to it
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// Portfolio Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    projects.forEach(project => {
      if (filter === 'all' || project.getAttribute('data-category') === filter) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

// Light and Dark Mode Toggle
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
  modeToggle.querySelector('i').classList.toggle('rotate');
});

