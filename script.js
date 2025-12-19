const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (Suavizado)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; 

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

// 2. EFEITOS DE HOVER (Com lógica de Raio-X corrigida)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, a, button';

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        // Se for a foto, o cursor cresce muito e mantém o branco sólido (RAIO-X)
        if (target.classList.contains('sobre-foto')) {
            cursor.style.width = '150px'; 
            cursor.style.height = '150px';
            cursor.style.backgroundColor = '#fff'; // Crucial para o mix-blend-mode
        } else {
            // Hover normal para links e botões
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.style.width = '25px'; // Tamanho padrão
        cursor.style.height = '25px';
        cursor.style.backgroundColor = '#fff'; // Volta ao branco sólido
    }
});

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { 
    threshold: 0.12, 
    rootMargin: "0px 0px -50px 0px" 
});

function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// 4. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    initReveal();
    // Evita o pulo do cursor no início
    ballX = mouseX;
    ballY = mouseY;
});

// 5. CONFIGURAÇÃO PARTICLES.JS
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "opacity": { "value": 0.3 },
            "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.15, "width": 1 },
            "move": { "enable": true, "speed": 1.2 }
        },
        "interactivity": { 
            "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true },
            "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.4 } } }
        },
        "retina_detect": true
    });
}

// 6. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
