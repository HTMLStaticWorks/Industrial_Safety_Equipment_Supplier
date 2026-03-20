/*
    Industrial Safety Equipment Supplier - main.js
*/

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // Page Loader
    // -------------------------------------------------------------------------
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // -------------------------------------------------------------------------
    // Dark Mode Toggle (Unified System)
    // -------------------------------------------------------------------------
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-sidebar');
    
    if (themeToggles.length > 0) {
        const setDarkMode = (isDark) => {
            if (isDark) {
                document.body.classList.add('dark-mode');
                themeToggles.forEach(t => t.classList.add('active'));
            } else {
                document.body.classList.remove('dark-mode');
                themeToggles.forEach(t => t.classList.remove('active'));
            }
            localStorage.setItem('theme-dark', isDark);
        };

        // Init dark mode checking local storage
        if (localStorage.getItem('theme-dark') === 'true' || 
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme-dark'))) {
            setDarkMode(true);
        }

        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const willBeDark = !document.body.classList.contains('dark-mode');
                setDarkMode(willBeDark);
            });
        });
    }

    // -------------------------------------------------------------------------
    // RTL Toggle 
    // -------------------------------------------------------------------------
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            document.body.classList.toggle('rtl');
            document.documentElement.setAttribute('dir', document.body.classList.contains('rtl') ? 'rtl' : 'ltr');
        });
    }

    // -------------------------------------------------------------------------
    // Scroll Behavior & Back to Top
    // -------------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('navbar-scrolled');
        } else {
            navbar?.classList.remove('navbar-scrolled');
        }

        if (window.scrollY > 300) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
    });

    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // -------------------------------------------------------------------------
    // Offcanvas Navigation control 
    // -------------------------------------------------------------------------
    // Using Bootstrap's built-in offcanvas, we just ensure body scroll is handled
    const myOffcanvas = document.getElementById('offcanvasNavbar');
    if (myOffcanvas) {
        const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
        
        myOffcanvas.addEventListener('show.bs.offcanvas', () => {
            document.body.style.overflow = 'hidden';
        });

        myOffcanvas.addEventListener('hidden.bs.offcanvas', () => {
            document.body.style.overflow = '';
        });

        // Close on link click
        myOffcanvas.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => bsOffcanvas.hide());
        });
        
        // Handle ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && myOffcanvas.classList.contains('show')) {
                bsOffcanvas.hide();
            }
        });
    }

    // -------------------------------------------------------------------------
    // Form Validation (Simple)
    // -------------------------------------------------------------------------
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // -------------------------------------------------------------------------
    // Product Filters (Home & Shop)
    // -------------------------------------------------------------------------
    const productFilters = document.querySelectorAll('.filter-btn');
    if (productFilters.length > 0) {
        productFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                productFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Filter logic would go here
            });
        });
    }

    // -------------------------------------------------------------------------
    // Animation observed by scroll (Intersection Observer)
    // -------------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it's visible
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Select all elements that should reveal on scroll
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-right, .animate-me');
    revealElements.forEach(el => revealObserver.observe(el));
});
