// Sincronizar lupa
const contentOriginal = document.getElementById('content-to-copy');
const lupaContent = document.getElementById('lupa-content');
const lupaWrapper = document.getElementById('lupa-wrapper');

lupaContent.innerHTML = contentOriginal.innerHTML;

// Mover lupa
document.addEventListener('mousemove', (e) => {
    lupaWrapper.style.left = e.clientX + 'px';
    lupaWrapper.style.top = e.clientY + 'px';

    const zoom = 1.05;
    const scrollY = window.scrollY;
    const moveX = -(e.clientX * zoom) + (lupaWrapper.offsetWidth / 2);
    const moveY = -((e.clientY + scrollY) * zoom) + (lupaWrapper.offsetHeight / 2);

    lupaContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
});

// Efecto Hover
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => lupaWrapper.classList.add('active'));
    item.addEventListener('mouseleave', () => lupaWrapper.classList.remove('active'));
});

// PARTÍCULAS GRANDES CORREGIDAS
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { 
            "value": 6, /* PARTÍCULAS MUCHO MÁS GRANDES */
            "random": true 
        },
        "line_linked": { 
            "enable": true, 
            "distance": 200, /* RED MÁS GRANDE */
            "color": "#38bdf8", 
            "opacity": 0.4, 
            "width": 2 /* LÍNEAS MÁS GRUESAS */
        },
        "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": {
        "events": { "onclick": { "enable": true, "mode": "push" } }
    }
});
