/**
 * Blanco Nimai Portfolio - Script Master (Raio-X & Performance)
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP OTIMIZADO)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; 

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
        
        // GPU acceleration para 60fps constantes
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
} else if (cursor) {
    cursor.style.display = 'none'; 
}

// 2. LÓGICA DE INTERAÇÃO (RAIO-X VS ACTIVE)
// Seletores para o aumento padrão (branco suave)
const standardHover = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        // Se for a FOTO, ativa o modo RAIO-X (Azul)
        if (e.target.closest('.sobre-foto')) {
            cursor.classList.add('x-ray');
        } 
        // Se for qualquer outro link/card, ativa o modo ACTIVE (Aumento padrão)
        else if (e.target.closest(standardHover)) {
            cursor.classList.add('active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        cursor.classList.remove('active');
        cursor.classList.remove('x-ray');
    });
}

// 3. SCROLL REVEAL (INTERSECTION OBSERVER)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

// 4. INICIALIZAÇÃO E PARTÍCULAS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" },
                "opacity": { "value": 0.5 },
                "size": { "value": 2, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.3, 
                    "width": 1 
                },
                "move": { 
                    "enable": true, 
                    "speed": 1.5, 
                    "out_mode": "out"
                }
            },
            "interactivity": { 
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } }
                }
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE COM OFFSET (FIX PARA NAVBAR FIXA)
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
