const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (Suavizado com RequestAnimationFrame)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; 

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
        cursor.style.opacity = "1";
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITOS DE HOVER OTIMIZADOS
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, button';

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.classList.add('active');
        
        // Efeito Raio-X ampliado especificamente para a foto de perfil
        if (target.classList.contains('sobre-foto')) {
            cursor.style.width = '120px'; // Um pouco maior para cobrir melhor a área
            cursor.style.height = '120px';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.classList.remove('active');
        cursor.style.width = ''; 
        cursor.style.height = '';
    }
});

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: unobserve para animar apenas uma vez e poupar processamento
            // revealObserver.unobserve(entry.target); 
        }
    });
}, { 
    threshold: 0.12, // Levemente reduzido para disparar mais cedo em dispositivos menores
    rootMargin: "0px 0px -20px 0px" 
});

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => revealObserver.observe(el));
}

// 4. CARREGAMENTO INICIAL E TRATAMENTO DE ERROS
window.addEventListener('load', () => {
    initReveal();
    // Sincroniza posição inicial para evitar o "salto" do cursor no primeiro movimento
    ballX = mouseX;
    ballY = mouseY;
});

// 5. CONFIGURAÇÃO PARTICLES.JS (Com verificação de segurança)
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 85, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4 },
            "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.15, "width": 1 },
            "move": { "enable": true, "speed": 1.2 }
        },
        "interactivity": { 
            "detect_on": "canvas", 
            "events": { 
                "onhover": { "enable": true, "mode": "grab" }, 
                "onclick": { "enable": false },
                "resize": true 
            },
            "modes": {
                "grab": { "distance": 180, "line_linked": { "opacity": 0.45 } }
            }
        },
        "retina_detect": true
    });
}

// 6. SCROLL SUAVE (Melhorado para considerar o Header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 90; // Espaço reservado para a navbar fixa
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
