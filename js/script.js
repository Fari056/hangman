const wordEl = document.getElementById('words');
const wrongLettersEl = document.getElementById('wrongletter');
const notifications = document.querySelector('#notification');
const playAgainBtn = document.getElementById('message-button');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('final-message');
const figureEl = document.querySelectorAll('.figure')

const word = ['application', 'programming', 'popup', 'hangman', 'hidden', 'random'];

let SelectedWord = word[Math.floor(Math.random() * word.length)];

const correctLetters = [];
const wrongLetters = [];

function displayLetters() {
    wordEl.innerHTML = `${SelectedWord
        .split('')
        .map(data =>
            `<span class="letters">${correctLetters.includes(data) ? data : ''}
            </span>`)
        .join('')}`;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // console.log(wordEl.innerText, innerWord)
    if (innerWord === SelectedWord) {
        messageEl.innerText = 'Congragulation! You won!'
        popup.style.display = 'flex';
    }
}
// update Wrong letters
function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
    ${wrongLetters.map(data => `<span>${data}</span>`)}
    `;

    figureEl.forEach((pa, data) => {
        const errors = wrongLetters.length;
        if (errors > data) {
            pa.style.display = 'block';
        }
        else {
            pa.style.display = 'none';
        }
    });

    if (figureEl.length === wrongLetters.length) {
        messageEl.innerText = 'Unfortunately! You Lost!';
        popup.style.display = 'flex';
    }
}

// function notification
function showNotification() {
    notifications.classList.add('show');

    setTimeout(() => {
        notifications.classList.remove('show');
    }, 1000);
}
// show letters
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const keyEl = e.key;
        // console.log(keyEl)
        if (SelectedWord.includes(keyEl)) {
            if (!correctLetters.includes(keyEl)) {
                correctLetters.push(keyEl);

                displayLetters();
            } else {
                showNotification();
            }

        } else {
            if (!wrongLetters.includes(keyEl)) {
                wrongLetters.push(keyEl);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
});

// play Again
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    SelectedWord = word[Math.floor(Math.random() * word.length)]

    displayLetters();
    updateWrongLetters();
    popup.style.display = 'none';
    // console.log(SelectedWord);
});

displayLetters();