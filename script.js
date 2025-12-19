const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (Suavizado com Interpolação)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; // Velocidade do rastro (ajuste entre 0.1 e 0.2)

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        // Cálculo suave de aproximação
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Atualiza posição centralizada
        cursor.style.left = ballX + 'px';
        cursor.style.top = ballY + 'px';
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITO DE HOVER UNIFICADO (Raio-X)
// Usamos a classe 'hover-trigger' que você colocou estrategicamente no HTML
const triggers = document.querySelectorAll('.hover-trigger');

triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        cursor.style.width = '120px'; // Aumenta para o efeito de "lupa"
        cursor.style.height = '120px';
    });
    
    trigger.addEventListener('mouseleave', () => {
        cursor.style.width = '25px'; // Volta ao tamanho original
        cursor.style.height = '25px';
    });
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
            "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true } 
        },
        "retina_detect": true
    });
}

// 6. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
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
