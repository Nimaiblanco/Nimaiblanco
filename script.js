// 1. Selección de elementos
const cursor = document.getElementById('cursor');

// 2. Seguimiento del mouse (Optimizado con requestAnimationFrame para suavidad)
document.addEventListener('mousemove', (e) => {
    // Usamos clientX/Y para que el cursor no se desplace con el scroll
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;
});

// 3. Detectar hover (Usando delegación de eventos para que funcione siempre)
document.addEventListener('mouseover', (e) => {
    // Si pasamos el mouse por un link o algo con la clase .hover-trigger
    if (e.target.classList.contains('hover-trigger') || e.target.closest('a')) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('hover-trigger') || e.target.closest('a')) {
        cursor.classList.remove('active');
    }
});

// 4. Configuración de Partículas (Aseguramos que cargue solo si la librería existe)
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": { 
                "value": 80,
                "density": { "enable": true, "value_area": 800 } 
            },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3 },
            "line_linked": { 
                "enable": true, 
                "distance": 150, 
                "color": "#38bdf8", 
                "opacity": 0.2, 
                "width": 1 
            },
            "move": { 
                "enable": true, 
                "speed": 1.5,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false },
                "onclick": { "enable": false },
                "resize": true
            }
        },
        "retina_detect": true
    });
}
