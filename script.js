document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: Pega aquí la URL de tu API de Apps Script
    const API_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT';

    // (El resto del código no cambia, solo el objeto innerIcons)
    const innerIcons = {
        trabajo: 'IconoTrabajoInner.png',
        personal: 'IconoVidaPersonalInner.png',
        gustos: 'IconoGustosInner.png'
    };
    
    // El resto del script sigue igual...
    const screens = { start: document.getElementById('start-screen'), category: document.getElementById('category-screen'), question: document.getElementById('question-screen') };
    const categoryItems = document.querySelectorAll('.category-item');
    const questionText = document.getElementById('question-text');
    const questionIcon = document.getElementById('question-icon');
    const backButton = document.getElementById('back-button');

    let allQuestions = {}; let availableQuestions = {}; let nextQuestions = {};

    function showScreen(screenKey) { Object.values(screens).forEach(s => s.classList.remove('active')); screens[screenKey].classList.add('active'); }
    function pickRandomQuestion(cat) { if (!availableQuestions[cat] || availableQuestions[cat].length === 0) { availableQuestions[cat] = [...allQuestions[cat]]; } const available = availableQuestions[cat]; if (!available || available.length === 0) return "No hay preguntas."; const idx = Math.floor(Math.random() * available.length); return available.splice(idx, 1)[0]; }
    function preselectQuestions() { Object.keys(allQuestions).forEach(cat => { nextQuestions[cat] = pickRandomQuestion(cat); }); }
    function displayQuestion(cat) { const q = nextQuestions[cat]; questionText.textContent = q; questionIcon.src = innerIcons[cat]; screens.question.className = 'screen ' + cat; showScreen('question'); }
    
    function init() {
        fetch(API_URL).then(response => response.json()).then(data => {
            if (data.error) { console.error("Error desde la API:", data.error); return; }
            allQuestions = data;
            Object.keys(allQuestions).forEach(key => { availableQuestions[key] = [...allQuestions[key]]; });
            preselectQuestions();
            console.log("Preguntas cargadas desde la API.");
        }).catch(error => console.error('Error al llamar a la API:', error));
        
        screens.start.addEventListener('click', () => showScreen('category'));
        categoryItems.forEach(item => item.addEventListener('click', () => displayQuestion(item.dataset.category)));
        backButton.addEventListener('click', () => { preselectQuestions(); showScreen('category'); });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./serviceworker.js').then(reg => console.log('Service Worker registrado.')).catch(err => console.error('Error al registrar Service Worker:', err));
        }
    }
    init();
});
