/**
 * Blanco Nimai Portfolio - Script Final Otimizado
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
        
        // Importante: impede que o cursor bloqueie o clique e a detecção das partículas
        cursor.style.pointerEvents = "none";
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none'; 
}

// 2. EFEITOS DE HOVER (Atualizado para o novo botão de CV)
// Adicionamos explicitamente o seletor do botão de currículo
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons a, .contact-info a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.add('active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.remove('active');
        }
    });
}

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
});

// 4. INICIALIZAÇÃO E PARTÍCULAS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" },
                "opacity": { 
                    "value": 0.7, 
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
                },
                "size": { 
                    "value": 3, "random": true,
                    "anim": { "enable": true, "speed": 2, "size_min": 0.5, "sync": false }
                },
                "line_linked": { 
                    "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.4, "width": 1.2
                },
                "move": { 
                    "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out", "bounce": false
                }
            },
            "interactivity": { 
                "detect_on": "window", 
                "events": { 
                    "onhover": { "enable": !isTouchDevice, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
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
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    });
});
