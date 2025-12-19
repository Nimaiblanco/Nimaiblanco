/**
 * Blanco Nimai Portfolio - Script Refinado Completo
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP - Linear Interpolation)
// Criamos um atraso suave para o cursor seguir o mouse com elegância
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; // Ajuste para mais ou menos suavidade

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        // Lógica de interpolação: a posição atual "anda" 15% em direção ao mouse a cada frame
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Usamos translate3d para forçar aceleração por hardware (GPU)
        // Isso evita que o cursor fique "tremido" ou com lag
        cursor.style.transform = `translate3d(calc(${ballX}px - 50%), calc(${ballY}px - 50%), 0)`;
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITOS DE HOVER (Delegación optimizada)
// Lista de elementos que fazem o cursor reagir
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.classList.add('active');
        
        // Efeito Especial: Se for a foto de perfil, o cursor vira uma lente maior (Raio-X)
        if (target.classList.contains('sobre-foto')) {
            cursor.style.width = '120px';
            cursor.style.height = '120px';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelectors);
    if (target) {
        cursor.classList.remove('active');
        cursor.style.width = ''; // Volta ao tamanho original do CSS
        cursor.style.height = '';
    }
});

// 3. SCROLL REVEAL (Intersection Observer)
// Faz os elementos surgirem com fade-in enquanto você desce a página
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Uma vez revelado, paramos de observar o elemento para poupar memória
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de entrar totalmente na tela
});

// 4. INICIALIZAÇÃO SEGURA E PARTÍCULAS
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Revelações (classes .reveal)
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Configuração do Particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" }, // Cor azul accent
                "opacity": { "value": 0.3 },
                "size": { "value": 2 },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.1, 
                    "width": 1 
                },
                "move": { "enable": true, "speed": 1.2 }
            },
            "interactivity": { 
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.4 } } }
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE PARA LINKS INTERNOS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80; // Espaço para não cobrir o título com a navbar
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
