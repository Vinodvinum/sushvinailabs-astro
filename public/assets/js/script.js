// --- MOBILE MENU ---
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', menuToggle.getAttribute('aria-label') || 'Toggle menu');

    function openMenu() {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        } else if (e.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('nav')) return;
        if (navLinks.classList.contains('active')) {
             closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// --- FORM HANDLER (for Web3Forms) ---
function setupContactForm() {
    const form = document.querySelector('form[action*="web3forms"]');
    if (!form) return;

    const successMessage = form.querySelector(".success-message");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (successMessage) successMessage.classList.remove("show");

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const result = await response.json();

            if (result.success) {
                form.reset();
                if (successMessage) {
                    successMessage.classList.add("show");
                    setTimeout(() => {
                        successMessage.classList.remove("show");
                    }, 5000);
                }
            } else {
                 throw new Error(result.message || "Submission failed.");
            }

        } catch (err) {
            console.error("Form submission error:", err);
            alert("❌ Something went wrong. Please try again.");
        }
    });
}

// --- SMOOTH SCROLL ---
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch(err) {
                console.error("Smooth scroll failed for selector:", targetId);
            }
        });
    });
}

// --- INITIALIZE ALL SCRIPTS ---
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupContactForm();
    setupSmoothScroll();
});