
// --- CONFIGURACIÓN ---

// Lista de Anuncios con los Links y Fotos que pediste
const ADS = [
    {
        title: "Ver Perfil Privado",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjATJn8PvoGW1_XlEBLi1bG53gHjuKbRrQfg&s",
        link: "https://www.youtube.com/watch?v=2yJgwwDcgV8"
    },
    {
        title: "¡RECLAMAR IPHONE 25!",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFMlFD01WChB2RF77ahNNRQu9D33hnpjCxcA&s",
        link: "https://www.youtube.com/watch?v=kp2EE00LDwA&list=RDkp2EE00LDwA&start_radio=1" // Redirección al Chacarron
    },
    {
        title: "¿Móvil Hirviendo?",
        img: "https://webusupload.apowersoft.info/airmorecom/wp-content/uploads/2016/09/cool-place.jpg",
        link: "https://www.youtube.com/watch?v=1msm0-rXlo4"
    },
    {
        title: "RETIRAR DINERO YA",
        img: "https://content.imageresizer.com/images/memes/Shut-Up-And-Take-My-Money-Fry-meme-3si4.jpg",
        link: "https://i.pinimg.com/736x/ce/e8/f8/cee8f88d931ae2cbd4161e389f2792b2.jpg"
    },
    {
        title: "GANADOR #1.000.000",
        img: "https://ih1.redbubble.net/image.5886332929.7614/st,small,507x507-pad,600x600,f8f8f8.jpg",
        link: "https://www.youtube.com/watch?v=CQeezCdF4mk"
    },
    {
        title: "⛔ NO TOCAR", // ESTA ES LA TRAMPA DE CAOS
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGCphhI-6xubrosaxxUXL4fnfGYvRPOSBXw&s",
        link: "#",
        isTrap: true
    }
];

// Secuencia de Modales Iniciales
const PRANK_STEPS = [
    {
        title: "⚠️ Almacenamiento Lleno",
        text: "ERROR CRÍTICO: Se ha detectado un exceso de FLOW en su dispositivo.",
        btn: "Liberar Ahora",
        type: "alert"
    },
    {
        title: "Escaneando Sistema...",
        media: "https://media.tenor.com/4AOeH4XlZ1EAAAAM/scanner-red-light-green-light.gif", // Radar Scanner
        btn: "Por favor espere...",
        type: "image"
    },
    {
        title: "Error de Verificación",
        media: "https://i.ibb.co/67qgMynM/QVZj-VFNh-S0-Zt-OEp-GZEZ4-QQ.jpg", // Meme Círculo
        btn: "Reintentar",
        type: "image"
    },
    {
        title: "💀 AMENAZA DETECTADA 💀",
        text: "EL TROYANO.SYS32.EXE HA INFECTADO SU DISPOSITIVO.",
        btn: "ELIMINAR AHORA",
        type: "alert"
    },
    {
        title: "ACTIVANDO DEFENSA",
        media: '<div style="position:relative; width:100%; height:100%; overflow:hidden; border-radius:8px; background:black;"><iframe src="https://streamable.com/e/7fdk3f?autoplay=1" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>',
        btn: "DETENER AUDIO",
        type: "html"
    },
    {
        title: "Error 404",
        media: "https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-animation-gif-download-3299960.gif",
        btn: "Entrar en Modo Seguro",
        type: "image"
    }
];

// --- ESTADO GLOBAL ---
let currentStep = 0;
let chaosMode = false;
let buttonMoves = 0;
const MAX_BUTTON_MOVES = 3;

// --- ELEMENTOS DOM ---
const modalOverlay = document.getElementById('prank-modal-overlay');
const mainInterface = document.getElementById('main-interface');
const adsGrid = document.getElementById('ads-grid');
const downloadBtn = document.getElementById('download-btn');
const chaosLayer = document.getElementById('chaos-layer');
const annoyingCat = document.getElementById('annoying-cat');
const catMsg = document.getElementById('cat-msg');
const hackerScreen = document.getElementById('hacker-screen');
const terminalContent = document.getElementById('terminal-content');
const finalGift = document.getElementById('final-gift');

// --- FUNCIONES ---

// 1. Inicializar Anuncios
function initAds() {
    ADS.forEach((ad, index) => {
        const div = document.createElement('div');
        div.className = `bg-white rounded-[20px] p-3 shadow-sm active:scale-95 transition-transform duration-200 flex flex-col gap-2 animate-float`;
        div.style.animationDelay = `${index * 0.5}s`;
        
        div.innerHTML = `
            <div class="w-full aspect-square rounded-[14px] bg-gray-50 overflow-hidden relative border border-gray-100">
                <img src="${ad.img}" class="w-full h-full object-cover">
                ${index % 2 === 0 ? '<span class="absolute top-2 right-2 bg-purple-200 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">NUEVO</span>' : ''}
            </div>
            <div class="px-1">
                <p class="text-[13px] font-semibold text-gray-800 leading-tight line-clamp-2">${ad.title}</p>
                <p class="text-[10px] text-gray-400 mt-1">Patrocinado</p>
            </div>
        `;

        div.onclick = () => {
            if (ad.isTrap) {
                activateChaos();
            } else {
                window.open(ad.link, '_blank');
            }
        };

        adsGrid.appendChild(div);
    });
}

// 2. Gestionar Secuencia de Bromas
function showStep(index) {
    if (index >= PRANK_STEPS.length) {
        // Fin de la secuencia inicial
        modalOverlay.classList.add('hidden');
        mainInterface.classList.remove('blur-[2px]');
        startAnnoyingCat();
        return;
    }

    const step = PRANK_STEPS[index];
    const titleEl = document.getElementById('modal-title');
    const textEl = document.getElementById('modal-text');
    const mediaEl = document.getElementById('modal-media');
    const btnEl = document.getElementById('modal-btn');

    titleEl.textContent = step.title;
    btnEl.textContent = step.btn;
    
    // Reset contents
    textEl.classList.add('hidden');
    mediaEl.classList.add('hidden');
    mediaEl.innerHTML = '';

    if (step.type === 'alert') {
        textEl.textContent = step.text;
        textEl.classList.remove('hidden');
    } else if (step.type === 'image') {
        mediaEl.classList.remove('hidden');
        mediaEl.innerHTML = `<img src="${step.media}" class="w-full h-auto object-cover max-h-[180px]">`;
    } else if (step.type === 'html') {
        mediaEl.classList.remove('hidden');
        mediaEl.style.height = "180px";
        mediaEl.innerHTML = step.media;
    }

    modalOverlay.classList.remove('hidden');

    // Remove old event listeners by cloning
    const newBtn = btnEl.cloneNode(true);
    btnEl.parentNode.replaceChild(newBtn, btnEl);

    newBtn.onclick = () => {
        currentStep++;
        showStep(currentStep);
    };
}

// 3. Activar Modo Caos
function activateChaos() {
    if (chaosMode) return;
    chaosMode = true;
    chaosLayer.classList.remove('hidden');
    // Cambiar colores de fondo aleatoriamente
    setInterval(() => {
        const colors = ['bg-red-500/20', 'bg-blue-500/20', 'bg-yellow-500/20'];
        chaosLayer.className = `fixed inset-0 pointer-events-none z-40 mix-blend-overlay ${colors[Math.floor(Math.random() * colors.length)]}`;
    }, 200);
    
    mainInterface.classList.add('animate-shake');
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

// 4. Botón Escurridizo
function moveButton() {
    if (buttonMoves >= MAX_BUTTON_MOVES) return;

    // Calcular nueva posición
    const padding = 20;
    const btnWidth = 200; // Ancho estimado si se vuelve absolute
    const maxW = window.innerWidth - btnWidth - padding;
    const maxH = window.innerHeight - 100;
    
    const randomX = Math.max(padding, Math.random() * maxW);
    const randomY = Math.max(100, Math.random() * maxH);

    // Cambiar a absolute
    downloadBtn.style.position = 'fixed';
    downloadBtn.style.width = '200px'; 
    downloadBtn.style.left = `${randomX}px`;
    downloadBtn.style.top = `${randomY}px`;
    downloadBtn.style.bottom = 'auto';
    downloadBtn.style.margin = '0';
    downloadBtn.style.transform = 'translate(0,0)';
    
    // Cambiar texto
    const texts = ["¡Muy lento!", "¡Ups!", "¡Casi!", "Intenta de nuevo"];
    downloadBtn.innerText = texts[Math.floor(Math.random() * texts.length)];
    
    buttonMoves++;
}

// 5. Gato Molesto
function startAnnoyingCat() {
    const messages = ["¿Buscando virus?", "Borrando System32...", "Cuidado ahí", "Haz click... si puedes", "Error 404: Cerebro"];
    
    setInterval(() => {
        annoyingCat.classList.remove('opacity-0', '-translate-y-24');
        annoyingCat.classList.add('opacity-100', 'translate-y-0');
        catMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        setTimeout(() => {
            annoyingCat.classList.add('opacity-0', '-translate-y-24');
            annoyingCat.classList.remove('opacity-100', 'translate-y-0');
        }, 3000);
    }, 8000);
}

// 6. Terminal Hacker (Final)
function startHackerSequence() {
    hackerScreen.classList.remove('hidden');
    hackerScreen.classList.add('flex');
    
    const logs = [
        "INICIANDO ACCESO ROOT...",
        "SALTANDO ENCLAVE SEGURO...",
        "ACCEDIENDO AL LLAVERO DE ICLOUD...",
        "BYPASSING FIREWALL...",
        "DESCARGANDO REGALO_SECRETO.ZIP...",
        "DESCIFRANDO ARCHIVOS...",
        "ACCESO CONCEDIDO."
    ];

    let delay = 0;
    logs.forEach((log, i) => {
        delay += Math.random() * 800 + 500;
        setTimeout(() => {
            const p = document.createElement('div');
            p.className = "mb-2 break-all";
            p.innerHTML = `<span class="mr-2 text-white/50">></span>${log}`;
            terminalContent.appendChild(p);
            
            // Auto scroll
            const cursor = document.createElement('span');
            cursor.className = 'cursor-blink';
            p.appendChild(cursor);
            
            // Remove previous cursor
            const prev = terminalContent.children[terminalContent.children.length - 2];
            if(prev && prev.querySelector('.cursor-blink')) {
                prev.querySelector('.cursor-blink').remove();
            }
            
            window.scrollTo(0, document.body.scrollHeight);

        }, delay);

        if (i === logs.length - 1) {
            setTimeout(() => {
                finalGift.classList.remove('hidden');
            }, delay + 1500);
        }
    });
}

// --- EVENT LISTENERS ---

// Al cargar
window.addEventListener('load', () => {
    initAds();
    // Pequeño delay para la primera broma
    setTimeout(() => {
        showStep(0);
    }, 500);
});

// Botón de Descarga
downloadBtn.addEventListener('click', (e) => {
    if (buttonMoves < MAX_BUTTON_MOVES) {
        moveButton();
    } else {
        // Éxito
        startHackerSequence();
    }
});

downloadBtn.addEventListener('mouseover', moveButton);
downloadBtn.addEventListener('touchstart', (e) => {
    if (buttonMoves < MAX_BUTTON_MOVES) {
        // e.preventDefault(); // Comentado para permitir click en el ultimo intento
        moveButton();
    }
}, {passive: true});