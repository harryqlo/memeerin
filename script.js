
// --- CONFIGURACIÓN ---

// Lista de Anuncios (Estilo Chileno / Meme)
const ADS = [
    {
        title: "¡UN MANJARSH!", // Meme Clásico
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjATJn8PvoGW1_XlEBLi1bG53gHjuKbRrQfg&s",
        link: "https://www.youtube.com/watch?v=2yJgwwDcgV8"
    },
    {
        title: "¡GANA IPHONE 25!", // Broma Chacarron
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFMlFD01WChB2RF77ahNNRQu9D33hnpjCxcA&s",
        link: "https://www.youtube.com/watch?v=kp2EE00LDwA&list=RDkp2EE00LDwA&start_radio=1" 
    },
    {
        title: "¿CELULAR CALIENTE?",
        img: "https://webusupload.apowersoft.info/airmorecom/wp-content/uploads/2016/09/cool-place.jpg",
        link: "https://www.youtube.com/watch?v=1msm0-rXlo4"
    },
    {
        title: "¡CÁLLATE Y TOMA MI PLATA!",
        img: "https://content.imageresizer.com/images/memes/Shut-Up-And-Take-My-Money-Fry-meme-3si4.jpg",
        link: "https://i.pinimg.com/736x/ce/e8/f8/cee8f88d931ae2cbd4161e389f2792b2.jpg"
    },
    {
        title: "ERES EL VISITANTE 1.000.000",
        img: "https://ih1.redbubble.net/image.5886332929.7614/st,small,507x507-pad,600x600,f8f8f8.jpg",
        link: "https://www.youtube.com/watch?v=CQeezCdF4mk"
    },
    {
        title: "⛔ NO TOCAR ESTE BOTÓN", // TRAMPA CAOS
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGCphhI-6xubrosaxxUXL4fnfGYvRPOSBXw&s",
        link: "#",
        isTrap: true
    }
];

// Secuencia de Modales Iniciales
const PRANK_STEPS = [
    {
        title: "⚠️ Almacenamiento Lleno",
        text: "Error de caché: Tu celular tiene exceso de flow.",
        btn: "Liberar Espacio",
        type: "alert"
    },
    {
        title: "Analizando Sistema...",
        media: "https://media.tenor.com/4AOeH4XlZ1EAAAAM/scanner-red-light-green-light.gif",
        btn: "Escanear",
        type: "image"
    },
    {
        title: "¡Virus Detectado!",
        media: "https://i.ibb.co/67qgMynM/QVZj-VFNh-S0-Zt-OEp-GZEZ4-QQ.jpg",
        btn: "Eliminar Ahora",
        type: "image"
    },
    {
        title: "⚠️ ERROR CRÍTICO",
        text: "EL TROYANO 'GATO_LOCO.EXE' ESTÁ ROBANDO TUS STICKERS.",
        btn: "BLOQUEAR ACCESO",
        type: "alert"
    },
    {
        title: "Error 404",
        media: "https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-animation-gif-download-3299960.gif",
        btn: "Reiniciar Descarga",
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
const defenseBtn = document.getElementById('defense-btn');
const defenseVideo = document.getElementById('defense-video');
const finalGift = document.getElementById('final-gift');

// --- FUNCIONES ---

function initAds() {
    ADS.forEach((ad, index) => {
        const div = document.createElement('div');
        div.className = `bg-white rounded-2xl p-3 shadow-sm active:scale-95 transition-transform duration-300 flex flex-col gap-2 animate-float cursor-pointer border border-gray-100 overflow-hidden`;
        div.style.animationDelay = `${index * 0.8}s`;
        
        div.innerHTML = `
            <div class="w-full aspect-square rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100 group">
                <img src="${ad.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                ${ad.isTrap ? '<div class="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">PELIGRO</div>' : ''}
            </div>
            <div class="px-1">
                <p class="text-[11px] font-bold text-gray-800 leading-tight line-clamp-2">${ad.title}</p>
                <p class="text-[9px] text-gray-400 mt-1 uppercase tracking-wide font-medium">Publicidad</p>
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

function showStep(index) {
    if (index >= PRANK_STEPS.length) {
        modalOverlay.classList.add('hidden');
        mainInterface.classList.remove('blur-sm');
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
        mediaEl.innerHTML = `<img src="${step.media}" class="w-full h-auto object-cover max-h-[220px]">`;
    }

    modalOverlay.classList.remove('hidden');
    if(index === 0) mainInterface.classList.add('blur-sm');

    const newBtn = btnEl.cloneNode(true);
    btnEl.parentNode.replaceChild(newBtn, btnEl);

    newBtn.onclick = () => {
        currentStep++;
        showStep(currentStep);
    };
}

function activateChaos() {
    if (chaosMode) return;
    chaosMode = true;
    chaosLayer.classList.remove('hidden');
    
    setInterval(() => {
        const colors = ['bg-red-500/20', 'bg-purple-500/20', 'bg-blue-500/20', 'bg-yellow-500/20'];
        chaosLayer.className = `fixed inset-0 pointer-events-none z-50 mix-blend-overlay transition-colors duration-200 ${colors[Math.floor(Math.random() * colors.length)]}`;
    }, 200);
    
    mainInterface.classList.add('animate-shake');
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
    catMsg.innerText = "¡TE DIJE QUE NO TOCARAS ESO!";
}

function moveButton(e) {
    if (buttonMoves >= MAX_BUTTON_MOVES) {
        startHackerSequence();
        return;
    }

    if(e) e.preventDefault();

    const btnWidth = 240; 
    const btnHeight = 64;
    const padding = 20;

    // Calcular área segura del viewport
    const safeWidth = window.innerWidth - btnWidth - padding;
    const safeHeight = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.random() * safeWidth);
    const randomY = Math.max(padding, Math.random() * safeHeight);

    // Cambiar a fixed para saltar libremente
    downloadBtn.style.position = 'fixed';
    downloadBtn.style.left = `${randomX}px`;
    downloadBtn.style.top = `${randomY}px`;
    downloadBtn.style.bottom = 'auto'; 
    downloadBtn.style.right = 'auto';
    downloadBtn.style.marginLeft = '0';
    downloadBtn.style.transform = 'none';
    downloadBtn.style.zIndex = '100';
    downloadBtn.style.width = '240px'; 
    
    const texts = ["¡Muy lenta!", "¡Anda a laar!", "¡Sáquese!", "¿Me atrapas?"];
    downloadBtn.innerText = texts[Math.floor(Math.random() * texts.length)];
    downloadBtn.classList.remove('bg-brand-primary');
    downloadBtn.classList.add('bg-pastel-red');
    
    buttonMoves++;
}

function startAnnoyingCat() {
    const messages = [
        "¡Oye! ¿Qué estai haciendo?",
        "¡Te paseaste!",
        "¡Me río to'a la noshe!",
        "¡Vistima, vistima!",
        "¿Y el virus pa cuándo?",
        "Cuidado con el botón..."
    ];
    
    setInterval(() => {
        annoyingCat.classList.remove('opacity-0', '-translate-y-32');
        annoyingCat.classList.add('opacity-100', 'translate-y-0');
        catMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        if (navigator.vibrate) navigator.vibrate(50);
        
        setTimeout(() => {
            annoyingCat.classList.add('opacity-0', '-translate-y-32');
            annoyingCat.classList.remove('opacity-100', 'translate-y-0');
        }, 3500);
    }, 7000);
}

function startHackerSequence() {
    // 1. DESAPARECER EL BOTÓN INMEDIATAMENTE
    downloadBtn.style.display = 'none';

    // 2. MOSTRAR PANTALLA NEGRA
    hackerScreen.classList.remove('hidden');
    hackerScreen.classList.add('flex');
    
    const logs = [
        "INICIANDO ROOTKIT...",
        "ACCEDIENDO A CÁMARA FRONTAL...",
        "SUBIENDO SELFIES A INSTAGRAM...",
        "DESCARGANDO: REGALO_SORPRESA.ZIP...",
        "ERROR 500: SEGURIDAD DETECTADA...",
        "INTENTANDO BYPASS...",
        "¡ALARMA DE INTRUSO ACTIVADA!"
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
            // AL TERMINAR LOGS: MOSTRAR VIDEO DEFENSA
            setTimeout(() => {
                finalTroll.classList.remove('hidden');
                finalTroll.classList.add('animate-pop-in');
                
                // INYECTAR URL PARA ACTIVAR AUDIO
                const src = defenseVideo.getAttribute('data-src');
                if (src) {
                    defenseVideo.src = src;
                }

                // MOSTRAR BOTÓN "DESACTIVAR" 4 SEGUNDOS DESPUÉS
                setTimeout(() => {
                    defenseBtn.classList.remove('hidden');
                }, 4000);

            }, delay + 1000);
        }
    });
}

function stopDefenseAndShowGift() {
    // DETENER VIDEO Y AUDIO
    defenseVideo.src = "";
    finalTroll.classList.add('hidden'); // Ocultar Alarma
    finalGift.classList.remove('hidden'); // Mostrar QR
}

// --- INICIALIZACIÓN ---

window.addEventListener('load', () => {
    initAds();
    // Retraso inicial pequeño para que cargue la estética
    setTimeout(() => {
        showStep(0);
    }, 800);
});

// Manejo de eventos del botón
const handleBtnInteraction = (e) => {
    if (buttonMoves < MAX_BUTTON_MOVES) {
        moveButton(e);
    } else {
        startHackerSequence();
    }
};

downloadBtn.addEventListener('mousedown', handleBtnInteraction);
downloadBtn.addEventListener('touchstart', handleBtnInteraction, { passive: false });
