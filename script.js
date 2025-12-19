:root {
    --bg: #000000;
    --accent: #38bdf8;
    --text-main: #ffffff;
    --text-dim: rgba(255, 255, 255, 0.6);
    --card-bg: rgba(255, 255, 255, 0.03);
    --card-border: rgba(255, 255, 255, 0.08);
}

* { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }

body { 
    background-color: var(--bg); 
    font-family: 'Inter', sans-serif; 
    color: var(--text-main); 
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

/* --- CURSOR FIX --- */
#cursor { 
    position: fixed; 
    top: 0; left: 0;
    width: 20px; height: 20px; 
    background-color: #fff;
    border-radius: 50%; 
    pointer-events: none; 
    z-index: 99999; /* Valor altíssimo para ficar sobre tudo */
    mix-blend-mode: difference; 
    transition: width 0.3s ease, height 0.3s ease;
    will-change: transform;
}

#cursor.active { width: 60px; height: 60px; }

#particles-js {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 1; /* Fica no fundo */
}

#main-wrapper { position: relative; z-index: 2; }

/* SEÇÕES */
section { padding: 100px 10%; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
.section-title { color: var(--accent); font-size: 0.75rem; letter-spacing: 6px; margin-bottom: 20px; font-weight: 900; text-transform: uppercase; }

/* HERO */
.hero h1 { font-family: 'Archivo Narrow', sans-serif; font-size: 9vw; line-height: 0.85; text-transform: uppercase; }
.software-dev { color: var(--accent); letter-spacing: 8px; font-weight: 900; font-size: 0.8rem; margin-top: 20px; }

/* SKILLS */
.skills-container { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 30px; }
.skill-card { 
    background: var(--card-bg); border: 1px solid var(--card-border); 
    width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; border-radius: 12px;
    transition: 0.4s ease;
}
.skill-card:hover { border-color: var(--accent); transform: translateY(-10px); background: rgba(56, 189, 248, 0.05); }
.skill-card img { width: 50px; height: 50px; filter: grayscale(1); transition: 0.3s; }
.skill-card:hover img { filter: grayscale(0); }

.skills-names { text-align: center; color: var(--text-dim); font-size: 12px; letter-spacing: 2px; }

/* REVEAL ANIMATION */
.reveal { opacity: 0; transform: translateY(30px); transition: 1s ease; }
.reveal.active { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
    * { cursor: auto !important; }
    #cursor { display: none; }
    .hero h1 { font-size: 15vw; }
}
