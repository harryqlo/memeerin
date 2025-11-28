
// --- CONFIGURACIÓN ---

// Lista de Anuncios
const ADS = [
    {
        title: "Ver Perfil Privado",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjATJn8PvoGW1_XlEBLi1bG53gHjuKbRrQfg&s",
        link: "https://www.youtube.com/watch?v=2yJgwwDcgV8"
    },
    {
        title: "¡RECLAMAR IPHONE 25!",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFMlFD01WChB2RF77ahNNRQu9D33hnpjCxcA&s",
        link: "https://www.youtube.com/watch?v=kp2EE00LDwA&list=RDkp2EE00LDwA&start_radio=1" // Video de Chacarron
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
        title: "⛔ NO TOCAR", // TRAMPA CAOS
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGCphhI-6xubrosaxxUXL4fnfGYvRPOSBXw&s",
        link: "#",
        isTrap: true
    }
];

// Secuencia de Modales Iniciales (SIN VIDEO AQUÍ, SOLO ALERTAS)
const PRANK_STEPS = [
    {
        title: "⚠️ Espacio Insuficiente",
        text: "Error de caché: Su dispositivo está sobrecargado de estilo.",
        btn: "Liberar Espacio",
        type: "alert"
    },
    {
        title: "Verificando Seguridad...",
        media: "https://media.tenor.com/4AOeH4XlZ1EAAAAM/scanner-red-light-green-light.gif",
        btn: "Escanear",
        type: "image"
    },
    {
        title: "¡Amenaza Detectada!",
        media: "https://i.ibb.co/67qgMynM/QVZj-VFNh-S0-Zt-OEp-GZEZ4-QQ.jpg",
        btn: "Eliminar Virus",
        type: "image"
    },
    {
        title: "⚠️ ALERTA CRÍTICA",
        text: "EL TROYANO.GATO.EXE HA TOMADO EL CONTROL DEL AUDIO.",
        btn: "BLOQUEAR ACCESO",
        type: "alert"
    },
    {
        title: "Error 404",
        media: "https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-animation-gif-download-3299960.gif",
        btn: "Modo Recuperación",
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
const finalTroll = document.getElementById('final-troll');
const finalGift = document.getElementById('final-gift');

// --- FUNCIONES ---

// 1. Inicializar Anuncios
function initAds() {
    ADS.forEach((ad, index) => {
        const div = document.createElement('div');
        div.className = `bg-white rounded-2xl p-3 shadow-sm active:scale-95 transition-transform duration-300 flex flex-col gap-2 animate-float cursor-pointer`;
        div.style.animationDelay = `${index * 0.8}s`;
        
        div.innerHTML = `
            <div class="w-full aspect-square rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100 group">
                <img src="${ad.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="px-1">
                <p class="text-[12px] font-bold text-gray-800 leading-tight line-clamp-2">${ad.title}</p>
                <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">Promocionado</p>
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
    
    textEl.classList.add('hidden');
    mediaEl.classList.add('hidden');
    mediaEl.innerHTML = '';

    if (step.type === 'alert') {
        textEl.textContent = step.text;
        textEl.classList.remove('hidden');
    } else if (step.type === 'image') {
        mediaEl.classList.remove('hidden');
        mediaEl.innerHTML = `<img src="${step.media}" class="w-full h-auto object-cover max-h-[200px]">`;
    }

    modalOverlay.classList.remove('hidden');

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
    
    setInterval(() => {
        const colors = ['bg-red-500/30', 'bg-purple-500/30', 'bg-green-500/30', 'bg-yellow-500/30'];
        chaosLayer.className = `fixed inset-0 pointer-events-none z-50 mix-blend-overlay transition-colors duration-100 ${colors[Math.floor(Math.random() * colors.length)]}`;
    }, 150);
    
    mainInterface.classList.add('animate-shake');
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
    catMsg.innerText = "¡NO DEBISTE TOCAR ESO!";
}

// 4. Botón Escurridizo
function moveButton(e) {
    if (buttonMoves >= MAX_BUTTON_MOVES) {
        startHackerSequence();
        return;
    }

    if(e) e.preventDefault();

    const btnWidth = 220; 
    const btnHeight = 70;
    const padding = 20;

    const safeWidth = window.innerWidth - btnWidth - padding;
    const safeHeight = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.random() * safeWidth);
    const randomY = Math.max(padding, Math.random() * safeHeight);

    downloadBtn.style.position = 'fixed';
    downloadBtn.style.left = `${randomX}px`;
    downloadBtn.style.top = `${randomY}px`;
    downloadBtn.style.bottom = 'auto';
    downloadBtn.style.right = 'auto';
    downloadBtn.style.marginLeft = '0';
    downloadBtn.style.transform = 'none';
    downloadBtn.style.zIndex = '100';
    
    const texts = ["¡Uy!", "¡Casi!", "¡Muy lento!", "Intenta otra vez"];
    downloadBtn.innerText = texts[Math.floor(Math.random() * texts.length)];
    downloadBtn.classList.remove('bg-brand-primary');
    downloadBtn.classList.add('bg-pastel-red');
    
    buttonMoves++;
}

// 5. Gato Molesto
function startAnnoyingCat() {
    const messages = ["Detectando intruso...", "Tus archivos corren peligro", "¿Seguro que quieres descargar?", "System32 eliminado"];
    
    setInterval(() => {
        annoyingCat.classList.remove('opacity-0', '-translate-y-32');
        annoyingCat.classList.add('opacity-100', 'translate-y-0');
        catMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        setTimeout(() => {
            annoyingCat.classList.add('opacity-0', '-translate-y-32');
            annoyingCat.classList.remove('opacity-100', 'translate-y-0');
        }, 4000);
    }, 7000);
}

// 6. Terminal Hacker (Secuencia Final)
function startHackerSequence() {
    hackerScreen.classList.remove('hidden');
    hackerScreen.classList.add('flex');
    
    const logs = [
        "ESTABLECIENDO CONEXIÓN SEGURA...",
        "ACCEDIENDO A MAIN_DB...",
        "BYPASSING FIREWALL (PORT 443)...",
        "ENCONTRADO: REGALO_AHIJADA.ZIP...",
        "DESENCRIPTANDO CLAVE PRIVADA...",
        "ACTIVANDO PROTOCOLO DEFENSA...",
        "ERROR CRÍTICO: INTRUSO DETECTADO."
    ];

    let delay = 0;
    logs.forEach((log, i) => {
        delay += Math.random() * 600 + 400;
        setTimeout(() => {
            const p = document.createElement('div');
            p.className = "mb-2 font-mono break-all leading-tight";
            p.innerHTML = `<span class="mr-2 text-green-700 font-bold">></span>${log}`;
            terminalContent.appendChild(p);
            
            const cursor = document.createElement('span');
            cursor.className = 'cursor-blink inline-block w-2 h-4 bg-green-500 ml-1 align-middle';
            p.appendChild(cursor);
            
            const prev = terminalContent.children[terminalContent.children.length - 2];
            if(prev && prev.querySelector('.cursor-blink')) {
                prev.querySelector('.cursor-blink').remove();
            }
            
            const container = document.getElementById('terminal-content');
            container.scrollTop = container.scrollHeight;

        }, delay);

        if (i === logs.length - 1) {
            // AL TERMINAR LOGS, MOSTRAR VIDEO DE DEFENSA (NO QR AUN)
            setTimeout(() => {
                finalTroll.classList.remove('hidden');
                finalTroll.classList.add('animate-pop-in');
            }, delay + 1000);
        }
    });
}

// 7. Detener Defensa y Mostrar QR
function stopDefenseAndShowGift() {
    finalTroll.classList.add('hidden'); // Ocultar video
    finalGift.classList.remove('hidden'); // Mostrar QR
    // Lanzar confeti si es posible (opcional)
}

// --- INITIALIZATION ---

window.addEventListener('load', () => {
    initAds();
    setTimeout(() => {
        showStep(0);
    }, 800);
});

// Eventos del Botón
const handleBtnInteraction = (e) => {
    if (buttonMoves < MAX_BUTTON_MOVES) {
        moveButton(e);
    } else {
        startHackerSequence();
    }
};

downloadBtn.addEventListener('mousedown', handleBtnInteraction);
downloadBtn.addEventListener('touchstart', handleBtnInteraction, { passive: false });
