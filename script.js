const cursor = document.getElementById('cursor');

// 1. EFEITO DE CARREGAMENTO (FADE-IN INICIAL)
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
});

// 2. MOVIMENTAÇÃO DO CURSOR CUSTOMIZADO
document.addEventListener('mousemove', (e) => {
    // Usando requestAnimationFrame para garantir 60fps e suavidade
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// 3. EFEITO DE EXPANSÃO DO CURSOR (DELEGAÇÃO DE EVENTOS)
// Ativa o cursor expandido ao entrar em elementos interativos
document.addEventListener('mouseover', (e) => {
    const target = e.target;
    
    if (
        target.classList.contains('hover-trigger') || 
        target.closest('.social-icon') || 
        target.closest('.skill-card') || 
        target.closest('.btn-contato') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
    ) {
        cursor.classList.add('active');
    }
});

// Remove a expansão ao sair dos elementos
document.addEventListener('mouseout', (e) => {
    const target = e.target;
    
    if (
        target.classList.contains('hover-trigger') || 
        target.closest('.social-icon') || 
        target.closest('.skill-card') || 
        target.closest('.btn-contato') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
    ) {
        cursor.classList.remove('active');
    }
});

// 4. CONFIGURAÇÃO DO PARTICLES.JS (EFEITO DE FUNDO)
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
        "events": { 
            "onhover": { "enable": true, "mode": "grab" }, // Efeito de atrair partículas
            "resize": true 
        } 
    },
    "retina_detect": true
});

// 5. SCROLL SUAVE PARA OS LINKS INTERNOS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calcula a posição e rola suavemente
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
