Ajusta mes script, /**
 * Blanco Nimai Portfolio - Script Otimizado
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; 

// Detecção de Touch (Evita bugs em tablets e celulares)
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Garante que o cursor apareça no primeiro movimento
        cursor.style.opacity = "1";
    });

    // Esconde o cursor quando o mouse sai da janela (ex: mudar de aba)
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = "0";
    });

    function updateCursor() {
        // Lógica de interpolação suavizada
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Melhoria de performance: evita usar calc() dentro do JS
        // O translate(-50%, -50%) é melhor gerenciado no CSS inicial
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none'; // Desativa em dispositivos móveis
}

// 2. EFEITOS DE HOVER (Delegación)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        
        if (target) {
            cursor.classList.add('active');
            
            // Efeito especial para a foto
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
    // Reveal
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 1000 } },
                "color": { "value": "#38bdf8" },
                "opacity": { "value": 0.2 },
                "size": { "value": 1.5 },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.05, 
                    "width": 1 
                },
                "move": { "enable": true, "speed": 0.8 }
            },
            "interactivity": { 
                "events": { 
                    "onhover": { "enable": !isTouchDevice, "mode": "grab" } 
                } 
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE (Fix para browsers antigos e offset)
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
