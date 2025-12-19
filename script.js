const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (Suavizado com RequestAnimationFrame)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; 

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        cursor.style.transform = `translate(calc(${ballX}px - 50%), calc(${ballY}px - 50%))`;
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITOS DE HOVER (Atualizado para incluir novos elementos do footer)
const hoverSelectors = '.hover-trigger, .social-icon, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, a, button';

document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) {
        cursor.style.width = '50px';  // Aumenta o cursor no hover
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) {
        cursor.style.width = '25px'; // Volta ao normal
        cursor.style.height = '25px';
        cursor.style.backgroundColor = '#fff';
    }
});

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // revealObserver.unobserve(entry.target); // Opcional: remover para animar sempre que entrar na tela
        }
    });
}, { 
    threshold: 0.10, // Um pouco mais sensível para telas menores
    rootMargin: "0px 0px -20px 0px" 
});

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => revealObserver.observe(el));
}

// 4. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    initReveal();
});

// 5. CONFIGURAÇÃO PARTICLES.JS
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3 },
            "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1 }
        },
        "interactivity": { 
            "detect_on": "canvas", 
            "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true } 
        },
        "retina_detect": true
    });
}

// 6. SCROLL SUAVE (Correção de offset para a Navbar fixa)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100; // Espaço para não cobrir o título da seção
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
