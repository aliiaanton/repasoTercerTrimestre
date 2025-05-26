// Lista de palabras relacionadas con Colecciones Java
const words = [
    "ArrayList",
    "LinkedList",
    "HashSet",
    "TreeSet",
    "HashMap",
    "TreeMap",
    "Collection",
    "List",
    "Set",
    "Map",
    "Queue",
    "LinkedHashMap",
    "LinkedHashSet",
    "Genericos",
    "Comparator",
    "Insert", 
    "Sort", 
    "Add", 
    "Remove", 
    "Contains" 
];

// Variables globales del juego
let currentWord = '';
let scrambledWord = '';
let score = 0;
let currentWordIndex = -1; // Para asegurar que se elige uno nuevo al inicio
let shuffledWords = []; // Array para las palabras desordenadas

// Elementos del DOM
const scrambledWordElement = document.getElementById('scrambled-word');
const guessInputElement = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextWordButton = document.getElementById('next-word');
const gameArea = document.getElementById('game-area');
const gameOverArea = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-game');

// Función para desordenar un array (Algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

// Función para revolver las letras de una palabra
function scrambleWord(word) {
    if (!word) return '';
    let letters = word.split('');
    let scrambled;
    // Asegurarse de que la palabra revuelta es diferente a la original
    do {
        scrambled = shuffleArray([...letters]).join(''); // Usar copia para shuffle
    } while (scrambled === word && word.length > 1); // Evitar bucle infinito si palabra original = revuelta (palabras cortas)
    return scrambled;
}

// Función para cargar la siguiente palabra
function loadNextWord() {
    currentWordIndex++;

    if (currentWordIndex >= shuffledWords.length) {
        // Fin del juego
        showGameOver();
        return;
    }

    currentWord = shuffledWords[currentWordIndex];
    scrambledWord = scrambleWord(currentWord.toUpperCase()); // Mostramos en mayúsculas

    scrambledWordElement.textContent = scrambledWord;
    guessInputElement.value = '';
    feedbackElement.textContent = '';
    feedbackElement.className = ''; // Limpiar clase de color
    guessInputElement.disabled = false;
    submitButton.style.display = 'inline-block';
    nextWordButton.style.display = 'none'; // Ocultar botón "Siguiente"
    guessInputElement.focus(); // Poner el foco en el input
}

// Función para comprobar la respuesta del usuario
function checkGuess() {
    const userGuess = guessInputElement.value.trim(); // trim() elimina espacios al inicio/final

    if (!userGuess) {
        feedbackElement.textContent = 'Por favor, escribe tu respuesta.';
        feedbackElement.className = 'incorrect';
        return;
    }

    // Comparación insensible a mayúsculas/minúsculas
    if (userGuess.toUpperCase() === currentWord.toUpperCase()) {
        feedbackElement.textContent = '¡Correcto!';
        feedbackElement.className = 'correct';
        score++;
        scoreElement.textContent = score;
        guessInputElement.disabled = true; // Deshabilitar input tras acertar
        submitButton.style.display = 'none'; // Ocultar botón Comprobar
        nextWordButton.style.display = 'inline-block'; // Mostrar botón Siguiente
        nextWordButton.focus(); // Poner foco en el botón siguiente

    } else {
        feedbackElement.textContent = 'Incorrecto. Inténtalo de nuevo.';
        feedbackElement.className = 'incorrect';
        guessInputElement.select(); // Seleccionar el texto para fácil corrección
    }
}

// Función para mostrar la pantalla de fin de juego
function showGameOver() {
    gameArea.style.display = 'none';
    gameOverArea.style.display = 'block';
    finalScoreElement.textContent = score;
}

// Función para iniciar/reiniciar el juego
function startGame() {
    score = 0;
    currentWordIndex = -1; // Reiniciar índice
    scoreElement.textContent = score;
    shuffledWords = shuffleArray([...words]); // Desordenar la lista de palabras original para cada juego

    gameArea.style.display = 'block';
    gameOverArea.style.display = 'none';

    loadNextWord(); // Cargar la primera palabra
}

// --- Event Listeners ---

// Comprobar al hacer clic en el botón
submitButton.addEventListener('click', checkGuess);

// Comprobar al presionar Enter en el input
guessInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Cargar siguiente palabra al hacer clic en el botón "Siguiente"
nextWordButton.addEventListener('click', loadNextWord);

// Reiniciar juego
restartButton.addEventListener('click', startGame);

// --- Iniciar el juego al cargar la página ---
startGame();