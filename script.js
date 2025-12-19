const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (Suavizado com RequestAnimationFrame)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; // Velocidade levemente reduzida para maior fluidez visual

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        // Interpolação linear para movimento suave
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        cursor.style.transform = `translate(calc(${ballX}px - 50%), calc(${ballY}px - 50%))`;
        
        // Garante que o cursor nunca fique invisível sobre elementos escuros
        cursor.style.opacity = "1";
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITOS DE HOVER OTIMIZADOS
// Selecionamos todos os gatilhos de interação
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, button';

// Delegação de eventos para melhor performance
document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.classList.add('active');
        
        // Se o mouse estiver sobre a foto, podemos aumentar ainda mais o cursor para o "raio-x"
        if (target.classList.contains('sobre-foto')) {
            cursor.style.width = '100px';
            cursor.style.height = '100px';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.classList.remove('active');
        cursor.style.width = ''; // Volta ao padrão do CSS
        cursor.style.height = '';
    }
});

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // unobserve se quiser que a animação ocorra apenas uma vez
            // revealObserver.unobserve(entry.target); 
        }
    });
}, { 
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
});

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => revealObserver.observe(el));
}

// 4. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    initReveal();
    // Forçar a posição inicial do cursor para evitar "pulo" no primeiro movimento
    ballX = mouseX;
    ballY = mouseY;
});

// 5. CONFIGURAÇÃO PARTICLES.JS
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4 },
            "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1.5 }
        },
        "interactivity": { 
            "detect_on": "canvas", 
            "events": { 
                "onhover": { "enable": true, "mode": "grab" }, 
                "onclick": { "enable": false },
                "resize": true 
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.5 } }
            }
        },
        "retina_detect": true
    });
}

// 6. SCROLL SUAVE (Correção de offset para a Navbar fixa)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
