document.addEventListener('DOMContentLoaded', () => {
    // CAMBIO: Apuntamos al archivo local en vez de a la API externa
    const QUESTIONS_FILE_URL = 'questions.json';

    const screens = { start: document.getElementById('start-screen'), category: document.getElementById('category-screen'), question: document.getElementById('question-screen') };
    const categoryItems = document.querySelectorAll('.category-item');
    const questionText = document.getElementById('question-text');
    const questionIcon = document.getElementById('question-icon');
    const backButton = document.getElementById('back-button');
    const themeColorMeta = document.getElementById('theme-color-meta');

    let allQuestions = {}; let availableQuestions = {}; let nextQuestions = {};
    const innerIcons = { trabajo: 'IconoTrabajoInner.png', personal: 'IconoVidaPersonalInner.png', gustos: 'IconoGustosInner.png' };

    const categoryHexColors = {
        trabajo: '#5fbac3',
        personal: '#e07baf',
        gustos: '#f7a936'
    };

    function showScreen(screenKey) { Object.values(screens).forEach(s => s.classList.remove('active')); screens[screenKey].classList.add('active'); }
    function pickRandomQuestion(cat) { if (!availableQuestions[cat] || availableQuestions[cat].length === 0) { availableQuestions[cat] = [...allQuestions[cat]]; } const available = availableQuestions[cat]; if (!available || available.length === 0) return "No hay preguntas."; const idx = Math.floor(Math.random() * available.length); return available.splice(idx, 1)[0]; }
    function preselectQuestions() { Object.keys(allQuestions).forEach(cat => { nextQuestions[cat] = pickRandomQuestion(cat); }); }
     function displayQuestion(cat) { 
        const q = nextQuestions[cat]; 
        questionText.textContent = q; 
        questionIcon.src = innerIcons[cat]; 
        screens.question.className = 'screen ' + cat; 
        document.body.style.backgroundColor = categoryHexColors[cat];
        themeColorMeta.content = categoryHexColors[cat];
        
        showScreen('question'); 
    }
    
     function init() {
        fetch('questions.json').then(response => response.json()).then(data => {
            allQuestions = data;
            Object.keys(allQuestions).forEach(key => { availableQuestions[key] = [...allQuestions[key]]; });
            preselectQuestions();
            console.log("Preguntas cargadas desde el archivo local.");
        }).catch(error => console.error('Error al cargar las preguntas:', error));
        
        screens.start.addEventListener('click', () => {
            // Cuando vamos a la pantalla de categorías, el fondo debe ser blanco
            document.body.style.backgroundColor = '#fff';
            themeColorMeta.content = '#fff';
            showScreen('category');
        });

        categoryItems.forEach(item => item.addEventListener('click', () => displayQuestion(item.dataset.category)));
        
        backButton.addEventListener('click', () => { 
            preselectQuestions(); 
            // --- CAMBIO CLAVE AQUÍ ---
            // Al regresar al menú, restauramos el color de fondo a blanco
            document.body.style.backgroundColor = '#fff';
            themeColorMeta.content = '#fff';
            showScreen('category'); 
        });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./serviceworker.js').then(reg => console.log('Service Worker registrado.')).catch(err => console.error('Error al registrar Service Worker:', err));
        }
    }
    init();
});
