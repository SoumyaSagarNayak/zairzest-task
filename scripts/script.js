// Zairza Technical Society Website JavaScript
// Handles login/logout, theme toggle, hamburger menu, and language selection

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const loginForm = document.getElementById('login-form');
  const logoutButton = document.getElementById('logout-button');
  const languageSelect = document.getElementById('language-select');

  // Initialize theme from localStorage or set default
  initializeTheme();

  // Hamburger menu toggle for mobile
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update button text
      themeToggle.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
  }

  // Login form handling
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      // Basic validation
      if (!username || !password) {
        showMessage('Please enter both username and password.', 'error');
        return;
      }

      // Simple authentication (in real app, this would be server-side)
      if (username.length >= 3 && password.length >= 3) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        showMessage('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
          window.location.href = 'landing.html';
        }, 1000);
      } else {
        showMessage('Username and password must be at least 3 characters long.', 'error');
      }
    });
  }

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      showMessage('Logged out successfully!', 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // Language selection (UI only)
  if (languageSelect) {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLanguage;

    languageSelect.addEventListener('change', (e) => {
      const selectedLanguage = e.target.value;
      localStorage.setItem('language', selectedLanguage);
      showMessage(`Language changed to ${getLanguageName(selectedLanguage)}`, 'success');
    });
  }

  // Route protection for landing page
  if (window.location.pathname.includes('landing.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      showMessage('Please log in to access this page.', 'error');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      // Welcome message for logged-in users
      const username = localStorage.getItem('username');
      if (username) {
        showMessage(`Welcome back, ${username}!`, 'success');
      }
    }
  }

  // Redirect logged-in users away from login page
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      window.location.href = 'landing.html';
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }
}

// Show temporary messages to user
function showMessage(message, type = 'info') {
  // Remove existing messages
  const existingMessage = document.querySelector('.message-popup');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `message-popup message-${type}`;
  messageEl.textContent = message;

  // Add to page
  document.body.appendChild(messageEl);

  // Trigger animation
  setTimeout(() => {
    messageEl.classList.add('show');
  }, 100);

  // Remove after delay
  setTimeout(() => {
    messageEl.classList.remove('show');
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 300);
  }, 3000);
}

// Get language display name
function getLanguageName(code) {
  const languages = {
    'en': 'English',
    'hi': 'Hindi',
    'or': 'Odia'
  };
  return languages[code] || 'English';
}

// Add loading animation for page transitions
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0.7';
});