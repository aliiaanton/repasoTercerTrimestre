// Lista de palabras y sus pistas
const wordData = [
    { word: "STREAM", hint: "Secuencia de elementos que soporta operaciones agregadas." },
    { word: "LAMBDA", hint: "Expresión anónima para implementar interfaces funcionales." },
    { word: "FILTER", hint: "Operación intermedia para seleccionar elementos según un predicado." },
    { word: "MAP", hint: "Operación intermedia para transformar cada elemento." },
    { word: "COLLECT", hint: "Operación terminal para agrupar resultados en una colección." },
    { word: "FOREACH", hint: "Operación terminal para realizar una acción en cada elemento." },
    { word: "PREDICATE", hint: "Interfaz funcional que representa una condición booleana." },
    { word: "FUNCTION", hint: "Interfaz funcional que transforma un valor en otro." },
    { word: "CONSUMER", hint: "Interfaz funcional que acepta un valor y no devuelve nada." },
    { word: "FUNCIONALES", hint: "Tipo de interfaces que tienen un solo método abstracto." },
    { word: "MAPTOINT", hint: "Transforma elementos a un IntStream." },
    { word: "OPTIONAL", hint: "Contenedor que puede o no tener un valor no nulo." },
    { word: "PIPELINE", hint: "Cadena de operaciones de Stream: fuente, intermedias, terminal." },
    { word: "TERMINALES", hint: "Operaciones que consumen el Stream y producen un resultado." },
    { word: "INTERMEDIAS", hint: "Operaciones que devuelven un nuevo Stream." },
    // { word: "FILTER", hint: "Duplicado, puedes eliminar uno o cambiar la pista." }, // Ya estaba, eliminamos o cambiamos
    { word: "SORTED", hint: "Operación intermedia para ordenar los elementos." },
    { word: "DISTINCT", hint: "Operación intermedia para eliminar elementos duplicados." },
    { word: "COUNT", hint: "Operación terminal para contar el número de elementos." },
    { word: "REDUCE", hint: "Operación terminal para combinar elementos en un solo resultado." },
    { word: "TOARRAY", hint: "Operación terminal para convertir un Stream en un array." }
];

// Constantes y Variables Globales
const MAX_WRONG_GUESSES = 6;
let selectedWordData = {}; // Ahora guardaremos el objeto completo (palabra y pista)
let selectedWord = '';
let selectedHint = '';
let guessedLetters = [];
let wrongGuesses = [];
let guessesLeft = MAX_WRONG_GUESSES;
let gameActive = true;
let hintUsedThisTurn = false; // Para controlar si la pista ya se usó en la palabra actual

// Elementos del DOM
const wordDisplayElement = document.getElementById('word-display');
const guessesLeftElement = document.getElementById('guesses-left');
const wrongLettersElement = document.getElementById('wrong-letters');
const letterButtonsContainer = document.getElementById('letter-buttons');
const messageElement = document.getElementById('message-area');
const restartButton = document.getElementById('restart-button');
const hintButton = document.getElementById('hint-button'); // NUEVO
const hintTextElement = document.getElementById('hint-text'); // NUEVO

// --- Funciones del Juego ---

// Iniciar o reiniciar el juego
function startGame() {
    gameActive = true;
    guessesLeft = MAX_WRONG_GUESSES;
    guessedLetters = [];
    wrongGuesses = [];
    hintUsedThisTurn = false; // Reiniciar el estado de la pista

    // Seleccionar palabra y pista aleatoria
    selectedWordData = wordData[Math.floor(Math.random() * wordData.length)];
    selectedWord = selectedWordData.word.toUpperCase(); // Aseguramos que sea mayúscula
    selectedHint = selectedWordData.hint;
    console.log("Palabra Secreta (para depuración):", selectedWord);
    console.log("Pista (para depuración):", selectedHint);

    // Inicializar la palabra mostrada con guiones bajos
    guessedLetters = Array(selectedWord.length).fill('_');

    // Limpiar y actualizar la pantalla
    messageElement.textContent = '';
    messageElement.className = '';
    wrongLettersElement.textContent = '';
    hintTextElement.textContent = ''; // Limpiar pista anterior
    hintTextElement.style.display = 'none'; // Ocultar área de pista
    hintButton.disabled = false; // Habilitar botón de pista
    hintButton.style.display = 'inline-block'; // Asegurar que el botón de pista sea visible
    updateDisplay();

    // Habilitar todos los botones de letras
    const buttons = letterButtonsContainer.querySelectorAll('button');
    buttons.forEach(button => button.disabled = false);

    // Ocultar botón de reinicio hasta el final
    restartButton.style.display = 'none';
}

// Actualizar los elementos visuales del juego
function updateDisplay() {
    wordDisplayElement.innerHTML = guessedLetters
        .map(letter => `<span class="letter-placeholder">${letter.toUpperCase()}</span>`) // Mostrar en mayúsculas
        .join('');

    guessesLeftElement.textContent = guessesLeft;
    wrongLettersElement.textContent = wrongGuesses.join(', ');

    checkGameState();
}

// Crear los botones del alfabeto
function createLetterButtons() {
    letterButtonsContainer.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        letterButtonsContainer.appendChild(button);
    }
}

// Manejar el intento de adivinar una letra
function handleGuess(guessedLetter) {
    const letterUpper = guessedLetter.toUpperCase(); // Trabajar siempre con mayúsculas

    if (!gameActive || wrongGuesses.includes(letterUpper) || guessedLetters.includes(letterUpper)) {
        return;
    }

    const buttons = letterButtonsContainer.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent === letterUpper) {
            button.disabled = true;
        }
    });

    if (selectedWord.includes(letterUpper)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letterUpper) {
                guessedLetters[i] = letterUpper;
            }
        }
    } else {
        guessesLeft--;
        wrongGuesses.push(letterUpper);
    }

    updateDisplay();
}

// Función para mostrar la pista
function showHint() {
    if (!gameActive || hintUsedThisTurn || guessesLeft <= 1) { // No dar pista si queda 1 intento o ya se usó
        if (guessesLeft <= 1 && !hintUsedThisTurn) {
            alert("No puedes pedir pista si te queda 1 intento o menos.");
        }
        return;
    }

    guessesLeft--; // Pedir pista cuesta un intento
    hintUsedThisTurn = true;
    hintButton.disabled = true; // Deshabilitar botón de pista después de usarlo
    hintTextElement.textContent = `Pista: ${selectedHint}`;
    hintTextElement.style.display = 'block';
    updateDisplay(); // Actualizar intentos restantes y comprobar estado del juego
}

// Comprobar el estado del juego (victoria, derrota o sigue)
function checkGameState() {
    if (!gameActive) return;

    if (!guessedLetters.includes('_')) {
        gameActive = false;
        messageElement.textContent = '¡Felicidades! ¡Has ganado!';
        messageElement.className = 'win';
        finalizeGame();
    } else if (guessesLeft <= 0) {
        gameActive = false;
        messageElement.textContent = `¡Has perdido! La palabra era: ${selectedWord}`;
        messageElement.className = 'lose';
        finalizeGame();
    }
}

// Funciones comunes al finalizar el juego (ganar o perder)
function finalizeGame() {
    restartButton.style.display = 'inline-block';
    disableAllLetterButtons();
    hintButton.style.display = 'none'; // Ocultar botón de pista al final
}

// Deshabilitar todos los botones de letras al final del juego
function disableAllLetterButtons() {
     const buttons = letterButtonsContainer.querySelectorAll('button');
     buttons.forEach(button => button.disabled = true);
}

// --- Inicialización y Event Listeners ---

createLetterButtons();
startGame(); // Iniciar el juego al cargar la página

restartButton.addEventListener('click', startGame);
hintButton.addEventListener('click', showHint); // NUEVO Event Listener

// Opcional: Permitir jugar con el teclado físico
document.addEventListener('keydown', (event) => {
    if (gameActive && event.key.length === 1 && event.key.match(/[a-z]/i)) {
        handleGuess(event.key.toUpperCase()); // Convertir a mayúscula
    }
});