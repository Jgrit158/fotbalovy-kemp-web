/* ============================================
   ELITE FOOTBALL CAMP - Interactive Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // CURSOR GLOW - follows mouse with soft light
    // ============================================
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursorGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();

    // Hide glow on mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
        cursorGlow.style.display = 'none';
    }

    // ============================================
    // FLOATING ELEMENTS - parallax on mouse move
    // ============================================
    const floatingElements = document.querySelectorAll('.hero-float');

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (e.clientX - centerX);
        const deltaY = (e.clientY - centerY);

        floatingElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.03;
            const x = deltaX * speed;
            const y = deltaY * speed;
            const rotate = deltaX * speed * 0.5;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        });
    });

    // ============================================
    // TILT EFFECT - cards react to mouse position
    // ============================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

            // Move glow
            const glow = card.querySelector('.pillar-glow');
            if (glow) {
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
                glow.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            const glow = card.querySelector('.pillar-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });

    // ============================================
    // NAVIGATION - scroll effects & mobile toggle
    // ============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ============================================
    // SCROLL REVEAL - animate elements on scroll
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.reveal');
                let delay = 0;
                siblings.forEach((sib, i) => {
                    if (sib === entry.target) {
                        delay = i * 100;
                    }
                });

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // COUNTER ANIMATION - stats counting up
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const increment = target / 40;
                const duration = 1500;
                const stepTime = duration / 40;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, stepTime);

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ============================================
    // PARTICLES - floating ambient particles
    // ============================================
    const particleContainer = document.getElementById('heroParticles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particleContainer.appendChild(particle);
    }

    // ============================================
    // SMOOTH SCROLL - for anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FORM HANDLING
    // ============================================
    const form = document.getElementById('registrationForm');
    const formSuccess = document.getElementById('formSuccess');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Odesílám...</span>';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Hide form fields, show success
                const formElements = form.querySelectorAll('.form-group, .form-row, .form-divider, .form-title, .form-checkbox, button');
                formElements.forEach(el => el.style.display = 'none');
                formSuccess.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert('Omlouváme se, došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte emailem.');
        }
    });

    // ============================================
    // MAGNETIC BUTTONS - subtle pull towards cursor
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn-primary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // PARALLAX ON SCROLL - subtle depth effect
    // ============================================
    const hero = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });

});
