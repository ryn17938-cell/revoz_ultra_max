document.addEventListener('DOMContentLoaded', function() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    if (!fadeInSections) {
        return;
    }

    const options = {
        root: null, // relative to document viewport 
        rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
        threshold: 0.1 // visible amount of item shown in relation to root
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ensure it's an internal link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});