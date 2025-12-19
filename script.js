/**
 * Blanco Nimai Portfolio - Script Corrigido e Otimizado
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
        
        // Mantemos o translate(-50%, -50%) aqui para garantir centralização perfeita no rastro
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none'; 
}

// 2. EFEITOS DE HOVER (Corrigido para Rayos X)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        
        if (target) {
            cursor.classList.add('active');
            
            // Se for a foto, adicionamos uma classe específica em vez de mudar o estilo manualmente
            // Isso permite que o CSS controle o tamanho sem quebrar o mix-blend-mode
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
            // Removemos as limpezas de style.width/color pois agora tudo é via CSS Class
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
