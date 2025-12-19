const cursor = document.getElementById('cursor');

// 1. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
    // Força uma verificação de reveal logo após o carregamento para itens que já estão na tela
    checkReveal();
});

// 2. MOVIMENTAÇÃO DO CURSOR (Suavizado com RequestAnimationFrame)
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 3. EFEITOS DE HOVER (Atualizado para incluir os Project Cards)
const hoverSelectors = '.hover-trigger, .social-icon, .skill-card, .project-card, .btn-contato, a, button';
document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) cursor.classList.add('active');
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) cursor.classList.remove('active');
});

// 4. SCROLL REVEAL (Detecta entrada de elementos na tela)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Para de observar após animar para economizar recursos
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
});

function checkReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Se o elemento já estiver visível (ex: topo da página), ativa imediatamente
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
        revealObserver.observe(el);
    });
}

// 5. CONFIGURAÇÃO PARTICLES.JS
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
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
}

// 6. SCROLL SUAVE PARA LINKS INTERNOS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});
