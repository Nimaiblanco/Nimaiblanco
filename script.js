/**
 * Blanco Nimai Portfolio - Script Corregido
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; 

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = "0";
    });

    function updateCursor() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none';
}

// 2. EFEITOS DE HOVER (Corregido para no romper el efecto Rayos X)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.add('active');
            
            // Si es la foto, solo aumentamos el tamaño, NO cambiamos el color
            if (target.classList.contains('sobre-foto')) {
                cursor.classList.add('cursor-large');
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.remove('active');
            cursor.classList.remove('cursor-large');
        }
    });
}

// 3. SCROLL REVEAL e 4. PARTÍCULAS (Se mantienen igual)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 1000 } },
                "color": { "value": "#38bdf8" },
                "opacity": { "value": 0.2 },
                "size": { "value": 1.5 },
                "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.05, "width": 1 },
                "move": { "enable": true, "speed": 0.8 }
            },
            "interactivity": { "events": { "onhover": { "enable": !isTouchDevice, "mode": "grab" } } },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
        }
    });
});
