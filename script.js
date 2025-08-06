document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const loginForm = document.getElementById('login-form');
  const logoutButton = document.getElementById('logout-button');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
      localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username && password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'landing.html';
      } else {
        alert('Please enter both username and password.');
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'index.html';
    });
  }

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      const selectedLanguage = e.target.value;
      localStorage.setItem('language', selectedLanguage);
    });

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      languageSelect.value = savedLanguage;
    }
  }

  if (window.location.pathname.includes('landing.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'index.html';
    }
  }
});
