const cursor = document.getElementById('cursor');

// 1. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
});

// 2. MOVIMENTAÇÃO DO CURSOR (60fps constante)
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 3. EFEITOS DE HOVER
const hoverSelectors = '.hover-trigger, .social-icon, .skill-card, .btn-contato, a, button';

document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) {
        cursor.classList.remove('active');
    }
});

// 4. SCROLL REVEAL (OBSERVADOR GERAL)
// Esta função ativa tanto as seções quanto os cards de skills
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: para de observar após revelar para ganhar performance
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

// Aplica o observador em tudo que tiver a classe .reveal
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. CONFIGURAÇÃO DO PARTICLES.JS
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3 },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1 },
        "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": { 
        "detect_on": "canvas", 
        "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true } 
    },
    "retina_detect": true
});

// 6. SCROLL SUAVE (Melhorado para considerar o topo da página)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
                top: offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});
