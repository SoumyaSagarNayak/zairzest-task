// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = this.theme === 'dark';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', () => this.toggleTheme());
        }
    }
}

// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.updateLanguageDisplay();
        this.bindEvents();
    }

    updateLanguageDisplay() {
        const languageText = document.querySelector('.language-text');
        if (languageText) {
            const langMap = {
                'en': 'EN',
                'hi': 'हि',
                'od': 'ଓଡ଼'
            };
            languageText.textContent = langMap[this.currentLang] || 'EN';
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateLanguageDisplay();
        this.closeDropdown();
    }

    toggleDropdown() {
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    }

    closeDropdown() {
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }

    bindEvents() {
        const languageBtn = document.getElementById('languageBtn');
        if (languageBtn) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown();
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleSmoothScroll();
    }

    toggleMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    handleSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.closeMobileMenu();
                }
            });
        });
    }

    bindEvents() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('navMenu');
            const mobileToggle = document.getElementById('mobileMenuToggle');
            
            if (navMenu && mobileToggle && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
}

// Authentication Management
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.bindEvents();
    }

    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentPage = window.location.pathname;
        
        // Redirect to login if not authenticated and trying to access landing page
        if (!isLoggedIn && currentPage.includes('landing.html')) {
            window.location.href = 'index.html';
        }
        
        // Redirect to landing if authenticated and on login/signup page
        if (isLoggedIn && (currentPage.includes('index.html') || currentPage.includes('indexsignup.html'))) {
            window.location.href = 'landing.html';
        }
    }

    async login(username, password) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simple validation - in real app, this would be server-side
                if (username && password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', username);
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: 'Invalid credentials' });
                }
            }, 1500);
        });
    }

    async signup(formData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (formData.fullname && formData.email && formData.username && formData.password) {
                    // Store user data (in real app, this would be server-side)
                    localStorage.setItem('userEmail', formData.email);
                    localStorage.setItem('userFullname', formData.fullname);
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: 'Please fill all fields' });
                }
            }, 1500);
        });
    }

    async logout() {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userFullname');
                resolve({ success: true });
            }, 1000);
        });
    }

    bindEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleLogin(e);
            });
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSignup(e);
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.showLogoutModal());
        }

        // Logout modal events
        const cancelLogout = document.getElementById('cancelLogout');
        const confirmLogout = document.getElementById('confirmLogout');
        
        if (cancelLogout) {
            cancelLogout.addEventListener('click', () => this.hideLogoutModal());
        }
        
        if (confirmLogout) {
            confirmLogout.addEventListener('click', () => this.handleLogout());
        }
    }

    async handleLogin(e) {
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        
        const loginBtn = form.querySelector('.login-btn');
        this.setButtonLoading(loginBtn, true);
        
        try {
            const result = await this.login(username, password);
            
            if (result.success) {
                this.showSuccessModal('Login Successful!', 'Redirecting to dashboard...');
                setTimeout(() => {
                    window.location.href = 'landing.html';
                }, 2000);
            } else {
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            this.setButtonLoading(loginBtn, false);
        }
    }

    async handleSignup(e) {
        const form = e.target;
        const formData = new FormData(form);
        const data = {
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password')
        };
        
        const signupBtn = form.querySelector('.login-btn');
        this.setButtonLoading(signupBtn, true);
        
        try {
            const result = await this.signup(data);
            
            if (result.success) {
                this.showSuccessModal('Account Created!', 'Redirecting to login...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert(result.message || 'Signup failed');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            this.setButtonLoading(signupBtn, false);
        }
    }

    showLogoutModal() {
        const modal = document.getElementById('logoutModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    hideLogoutModal() {
        const modal = document.getElementById('logoutModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    async handleLogout() {
        const confirmBtn = document.getElementById('confirmLogout');
        this.setButtonLoading(confirmBtn, true);
        
        try {
            const result = await this.logout();
            
            if (result.success) {
                this.hideLogoutModal();
                // Add fade out effect
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            }
        } catch (error) {
            alert('An error occurred during logout.');
        } finally {
            this.setButtonLoading(confirmBtn, false);
        }
    }

    setButtonLoading(button, loading) {
        if (!button) return;
        
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showSuccessModal(title, message) {
        const modal = document.getElementById('successModal');
        if (modal) {
            const titleElement = modal.querySelector('h3');
            const messageElement = modal.querySelector('p');
            
            if (titleElement) titleElement.textContent = title;
            if (messageElement) messageElement.textContent = message;
            
            modal.classList.add('active');
        }
    }
}

// Animation Utils
class AnimationUtils {
    static observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.wing-card, .stat-card, .contact-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    static addHoverEffects() {
        // Add subtle hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.wing-card, .stat-card, .btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-5px)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    new ThemeManager();
    new LanguageManager();
    new NavigationManager();
    new AuthManager();
    
    // Initialize animations
    AnimationUtils.observeElements();
    AnimationUtils.addHoverEffects();
    
    // Add smooth page transitions
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh auth status when page becomes visible
        const authManager = new AuthManager();
        authManager.checkAuthStatus();
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const authManager = new AuthManager();
    authManager.checkAuthStatus();
});