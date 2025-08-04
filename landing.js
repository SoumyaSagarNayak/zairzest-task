// Logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Show custom confirmation dialog with smooth animation
            showLogoutConfirmation();
        });
    }
    
    // Check if user is logged in, if not redirect to login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
});

function showLogoutConfirmation() {
    // Create custom modal for better UX
    const modal = document.createElement('div');
    modal.className = 'logout-modal';
    modal.innerHTML = `
        <div class="logout-modal-content">
            <div class="logout-modal-header">
                <h3>Confirm Logout</h3>
            </div>
            <div class="logout-modal-body">
                <p>Are you sure you want to logout?</p>
            </div>
            <div class="logout-modal-actions">
                <button class="btn-cancel" onclick="closeLogoutModal()">Cancel</button>
                <button class="btn-confirm" onclick="confirmLogout()">Logout</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .logout-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                animation: fadeInModal 0.3s ease-out forwards;
                backdrop-filter: blur(5px);
            }
            
            .logout-modal-content {
                background: var(--bg-color);
                border-radius: 12px;
                padding: 0;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                transform: scale(0.9) translateY(20px);
                animation: slideInModal 0.3s ease-out 0.1s forwards;
                overflow: hidden;
            }
            
            .logout-modal-header {
                padding: 20px 24px 16px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .logout-modal-header h3 {
                margin: 0;
                color: var(--text-primary);
                font-size: 18px;
                font-weight: 600;
            }
            
            .logout-modal-body {
                padding: 20px 24px;
            }
            
            .logout-modal-body p {
                margin: 0;
                color: var(--text-secondary);
                line-height: 1.5;
            }
            
            .logout-modal-actions {
                padding: 16px 24px 24px;
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }
            
            .btn-cancel, .btn-confirm {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                min-width: 80px;
            }
            
            .btn-cancel {
                background: var(--surface-color);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
            }
            
            .btn-cancel:hover {
                background: var(--border-color);
            }
            
            .btn-confirm {
                background: linear-gradient(135deg, #e34984, #d1246f);
                color: white;
            }
            
            .btn-confirm:hover {
                background: linear-gradient(135deg, #d1246f, #b91d5f);
                transform: translateY(-1px);
            }
            
            @keyframes fadeInModal {
                to { opacity: 1; }
            }
            
            @keyframes slideInModal {
                to { 
                    transform: scale(1) translateY(0);
                }
            }
            
            @media (max-width: 480px) {
                .logout-modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .logout-modal-actions {
                    flex-direction: column-reverse;
                }
                
                .btn-cancel, .btn-confirm {
                    width: 100%;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLogoutModal() {
    const modal = document.querySelector('.logout-modal');
    if (modal) {
        modal.style.animation = 'fadeOutModal 0.2s ease-out forwards';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 200);
    }
}

function confirmLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.querySelector('.logout-modal');
    
    // Close modal first
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
    
    // Update button state with smooth animation
    if (logoutBtn) {
        logoutBtn.classList.add('loading');
        const originalHTML = logoutBtn.innerHTML;
        
        logoutBtn.innerHTML = `
            <span class="logout-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6"></path>
                </svg>
            </span>
            <span class="logout-text">Logging out...</span>
        `;
        
        // Add fade out effect to page
        document.body.classList.add('fade-out');
        
        // Simulate logout process with smooth transition
        setTimeout(() => {
            // Clear all stored data
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('selectedLanguage');
            
            // Show success notification
            showSuccessNotification('Successfully logged out!');
            
            // Redirect to login page with delay for smooth transition
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        }, 1200);
    }
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        <style>
            .success-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
                z-index: 10001;
                transform: translateX(100%);
                animation: slideInNotification 0.3s ease-out forwards;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                font-weight: 500;
            }
            
            @keyframes slideInNotification {
                to { transform: translateX(0); }
            }
            
            @keyframes fadeOutModal {
                to { opacity: 0; }
            }
            
            @media (max-width: 480px) {
                .success-notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    transform: translateY(-100%);
                    animation: slideDownNotification 0.3s ease-out forwards;
                }
                
                @keyframes slideDownNotification {
                    to { transform: translateY(0); }
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', notificationStyles);
    document.body.appendChild(notification);
    
    // Auto remove notification
    setTimeout(() => {
        notification.style.animation = 'slideInNotification 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Language Selector Functionality
const languageSelector = document.getElementById('language-selector');
const translations = {
    en: {
        heroTitle: 'Welcome to <span class="highlight">Zairza</span>',
        heroSubtitle: 'A cult for OUTRians who want to be ahead in the game',
        heroMotto: '"Design, Create, Innovate"',
        exploreWings: 'Explore Wings',
        joinUs: 'Join Us',
        aboutTitle: 'About Zairza',
        aboutSubtitle: 'Technical Society of OUTR',
        wingsTitle: 'Our Wings',
        wingsSubtitle: 'Three pillars of innovation',
        contactTitle: 'Get In Touch',
        contactSubtitle: 'Ready to join the cult?'
    },
    hi: {
        heroTitle: '<span class="highlight">ज़ैरज़ा</span> में आपका स्वागत है',
        heroSubtitle: 'OUTRians के लिए एक समुदाय जो खेल में आगे रहना चाहते हैं',
        heroMotto: '"डिज़ाइन करें, बनाएं, नवाचार करें"',
        exploreWings: 'विंग्स एक्सप्लोर करें',
        joinUs: 'हमसे जुड़ें',
        aboutTitle: 'ज़ैरज़ा के बारे में',
        aboutSubtitle: 'OUTR की तकनीकी सोसायटी',
        wingsTitle: 'हमारे विंग्स',
        wingsSubtitle: 'नवाचार के तीन स्तंभ',
        contactTitle: 'संपर्क में रहें',
        contactSubtitle: 'समुदाय में शामिल होने के लिए तैयार हैं?'
    },
    or: {
        heroTitle: '<span class="highlight">ଜାଇର୍ଜାକୁ</span> ସ୍ୱାଗତ',
        heroSubtitle: 'OUTRians ପାଇଁ ଏକ ସମ୍ପ୍ରଦାୟ ଯେଉଁମାନେ ଖେଳରେ ଆଗରେ ରହିବାକୁ ଚାହାଁନ୍ତି',
        heroMotto: '"ଡିଜାଇନ୍ କରନ୍ତୁ, ସୃଷ୍ଟି କରନ୍ତୁ, ନବାଚାର କରନ୍ତୁ"',
        exploreWings: 'ୱିଙ୍ଗ୍ସ ଏକ୍ସପ୍ଲୋର କରନ୍ତୁ',
        joinUs: 'ଆମ ସହିତ ଯୋଗ ଦିଅନ୍ତୁ',
        aboutTitle: 'ଜାଇର୍ଜା ବିଷୟରେ',
        aboutSubtitle: 'OUTR ର ଟେକ୍ନିକାଲ୍ ସୋସାଇଟି',
        wingsTitle: 'ଆମର ୱିଙ୍ଗ୍ସ',
        wingsSubtitle: 'ନବାଚାରର ତିନୋଟି ସ୍ତମ୍ଭ',
        contactTitle: 'ଯୋଗାଯୋଗରେ ରୁହନ୍ତୁ',
        contactSubtitle: 'ସମ୍ପ୍ରଦାୟରେ ଯୋଗ ଦେବାକୁ ପ୍ରସ୍ତୁତ?'
    }
};

languageSelector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang);
});

// Load saved language preference
const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
languageSelector.value = savedLanguage;
if (savedLanguage !== 'en') {
    updateLanguage(savedLanguage);
}

function updateLanguage(lang) {
    const translation = translations[lang];
    if (!translation) return;

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroMotto = document.querySelector('.hero-motto');
    
    if (heroTitle) heroTitle.innerHTML = translation.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = translation.heroSubtitle;
    if (heroMotto) heroMotto.textContent = translation.heroMotto;

    // Update buttons
    const exploreBtn = document.querySelector('.btn-primary');
    const joinBtn = document.querySelector('.btn-secondary');
    
    if (exploreBtn) exploreBtn.textContent = translation.exploreWings;
    if (joinBtn) joinBtn.textContent = translation.joinUs;

    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    
    if (sectionTitles[0]) sectionTitles[0].textContent = translation.aboutTitle;
    if (sectionSubtitles[0]) sectionSubtitles[0].textContent = translation.aboutSubtitle;
    
    if (sectionTitles[1]) sectionTitles[1].textContent = translation.wingsTitle;
    if (sectionSubtitles[1]) sectionSubtitles[1].textContent = translation.wingsSubtitle;
    
    if (sectionTitles[2]) sectionTitles[2].textContent = translation.contactTitle;
    if (sectionSubtitles[2]) sectionSubtitles[2].textContent = translation.contactSubtitle;
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 26, 26, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .wing-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Hero Buttons Functionality
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.querySelector('#wings').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
        color: var(--primary-color);
        z-index: 10000;
    }
`;