/**
 * Blanco Nimai Portfolio - Script Corrigido e Otimizado
 * Ajustes: Partículas mais visíveis, brilho aumentado e interatividade melhorada.
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

// 2. EFEITOS DE HOVER (Corrigido para Rayos X)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        
        if (target) {
            cursor.classList.add('active');
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

// 4. INICIALIZAÇÃO E PARTÍCULAS (Configurações de Brilho e Visibilidade)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { 
                    "value": 70, // Aumentado para preencher melhor o fundo claro
                    "density": { "enable": true, "value_area": 900 } 
                },
                "color": { "value": "#38bdf8" },
                "opacity": { 
                    "value": 0.5, // Aumentado (antes 0.2) para partículas mais nítidas
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.2, "sync": false }
                },
                "size": { 
                    "value": 2, // Ligeiramente maior para visibilidade
                    "random": true 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.25, // Aumentado (antes 0.05) para ver as conexões claramente
                    "width": 1 
                },
                "move": { 
                    "enable": true, 
                    "speed": 1.2, // Movimento mais fluido e perceptível
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
                        "mode": "grab" // As linhas agora brilham e se conectam ao mouse
                    },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { 
                        "distance": 200, 
                        "line_linked": { "opacity": 0.6 } // Efeito de conexão forte ao passar o mouse
                    }
                }
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE (Melhorado com Offset dinâmico)
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
