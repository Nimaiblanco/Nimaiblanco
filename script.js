/**
 * Blanco Nimai Portfolio - Script Otimizado (Fundo Vibrante)
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

// 2. EFEITOS DE HOVER
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.add('active');
            if (target.classList.contains('sobre-foto')) {
                cursor.style.width = '120px';
                cursor.style.height = '120px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--accent)';
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.remove('active');
            cursor.style.width = ''; 
            cursor.style.height = '';
            cursor.style.backgroundColor = '';
            cursor.style.borderColor = '';
        }
    });
}

// 3. SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

// 4. INICIALIZAÇÃO E PARTÍCULAS (AJUSTADO PARA MAIOR VISIBILIDADE)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { 
                    "value": 80, // Aumentado para preencher mais o fundo
                    "density": { "enable": true, "value_area": 800 } 
                },
                "color": { "value": "#38bdf8" },
                "opacity": { 
                    "value": 0.4, // Aumentado (era 0.2) para as partículas aparecerem mais
                    "random": false 
                },
                "size": { 
                    "value": 2, // Levemente maior
                    "random": true 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.25, // Aumentado (era 0.05) para as linhas ficarem bem visíveis
                    "width": 1 
                },
                "move": { 
                    "enable": true, 
                    "speed": 1.2, // Um pouco mais rápido para dar vida ao fundo
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": { 
                "detect_on": "canvas",
                "events": { 
                    "onhover": { 
                        "enable": !isTouchDevice, 
                        "mode": "grab" // Cria conexões com o mouse
                    },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { 
                        "distance": 200, 
                        "line_linked": { "opacity": 0.5 } // Brilha ao passar o mouse
                    }
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
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    });
});
