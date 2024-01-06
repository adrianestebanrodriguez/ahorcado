document.addEventListener('DOMContentLoaded', function () {
    const words = ["jabalina", "patrona", "camellar", "florero", "hogar", "concierto", "mangostino", "papayuelo","larva","chespirito"];
    let selectedWord = "";
    let guessedLetters = [];
    let incorrectLetters = [];
    let hangmanImageIndex = 0;

    // Seleccionar una palabra al azar
    function selectRandomWord() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = Array(selectedWord.length).fill('_');
        incorrectLetters = [];
        hangmanImageIndex = 0;
        updateDisplay();
    }

    // Manejar la entrada de letras (actualizado para admitir toques en letras)
    document.getElementById('hangman-container').addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('letter')) {
            const letter = target.textContent.toLowerCase();

            if (guessedLetters.indexOf(letter) === -1 && incorrectLetters.indexOf(letter) === -1) {
                if (selectedWord.includes(letter)) {
                    for (let i = 0; i < selectedWord.length; i++) {
                        if (selectedWord[i] === letter) {
                            guessedLetters[i] = letter;
                        }
                    }
                } else {
                    incorrectLetters.push(letter);
                    hangmanImageIndex++;
                }

                updateDisplay();
            }
        }
    });
    
    // Actualizar la pantalla del juego
    function updateDisplay() {
        document.getElementById('word-display').textContent = guessedLetters.join(' ');
        document.getElementById('incorrect-letters').textContent = `Letras incorrectas: ${incorrectLetters.join(', ')}`;
        updateHangmanImage();
        checkGameStatus();
    }

    // Actualizar la imagen del ahorcado
    function updateHangmanImage() {
        const hangmanImage = document.getElementById('hangman-image');
        hangmanImage.innerHTML = getHangmanImage(hangmanImageIndex);
    }

    // Obtener la representación de la imagen del ahorcado
    function getHangmanImage(index) {
        const parts = [
            ' ',
            ' O',
            '\\|/',
            '/ \\'
        ];
        return parts.slice(0, index + 1).join('<br>');
    }

    // Verificar el estado del juego (ganado o perdido)
    function checkGameStatus() {
        if (guessedLetters.join('') === selectedWord) {
            setMessage('¡Felicidades! Has ganado.');
        } else if (hangmanImageIndex === 4) {
            setMessage(`Lo siento, has perdido. La palabra era "${selectedWord}".`);
        }
    }

    // Establecer un mensaje en la pantalla
    function setMessage(message) {
        document.getElementById('message').textContent = message;
    }

    // Manejar la entrada de letras
    document.addEventListener('keydown', function (event) {
        const letter = event.key.toLowerCase();

        if (/[a-z]/.test(letter) && guessedLetters.indexOf(letter) === -1 && incorrectLetters.indexOf(letter) === -1) {
            if (selectedWord.includes(letter)) {
                for (let i = 0; i < selectedWord.length; i++) {
                    if (selectedWord[i] === letter) {
                        guessedLetters[i] = letter;
                    }
                }
            } else {
                incorrectLetters.push(letter);
                hangmanImageIndex++;
            }

            updateDisplay();
        }
    });

    // Reiniciar el juego
    window.resetGame = function () {
        selectRandomWord();
        setMessage('');
    };

    // Iniciar el juego
    resetGame();
});
