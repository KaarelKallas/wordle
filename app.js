let nextPos = [0, 0];
const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'Õ', 'Ä', 'Ö', 'Ü']
let words = [];
let guess = '';
let gameOver = false;
const messageDiv = document.getElementById('message');
fetch('words.txt')
.then(res => res.text())
.then(d => {
    words = d.split('\n');
    console.log(words);

    randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);
document.addEventListener('keydown', e => {
    console.log(gameOver)
    if ( !gameOver ) {
    console.log(e.key);
    const key = e.key.toUpperCase();
    let nextCell = document.querySelector(`.container td[data-x="${nextPos[0]}"][data-y="${nextPos[1]}"]`)

    if (alphabet.includes(key) && nextPos[0] <= 4) {
        guess += key;
        nextCell.innerText = key;
        nextPos[0]++;
    } else if ( key == 'ENTER' && nextPos[0] == 5 ) {
        if (words.includes(guess.toLowerCase())) {
            const correctWord = randomWord.split('')
            for ( let i = 0; i < guess.length; i++ ) {
                const testCell = document.querySelector(`.container td[data-x="${i}"][data-y="${nextPos[1]}"]`)
                if (correctWord[i] == guess.charAt(i).toLowerCase()) {
                    testCell.classList.add('correct_letter');
                    correctWord[i] = '*';
                }
            }
            for (let i = 0; i < guess.length; i++) {
                const letter = guess.charAt(i).toLowerCase();
                testCell = document.querySelector(`.container td[data-x="${i}"][data-y="${nextPos[1]}"]`)
                if ( correctWord.includes(letter) && !testCell.classList.contains('correct_letter') ) {
                    testCell.classList.add('present_letter');
                    correctWord[correctWord.indexOf(letter)] = '*';

                } else {
                    console.log(randomWord.charAt(i), 'pole õige koha peal')
                }
                console.log(randomWord.charAt(i), guess.charAt(i))
            }
            if ( nextPos[1] == 5 || guess.toLowerCase() == randomWord ) {
                gameOver = true;
            }
            if ( gameOver ) {
                showAnswer(randomWord);
            }

            nextPos[1]++;
            nextPos[0] = 0;
            guess = '';


        } else {
            console.log("sõna ei ole olemas")
        }
    } else if (key == 'BACKSPACE' && nextPos[0] > 0 ) {
        nextPos[0] -= 1;
        guess = guess.slice(0, -1);
        nextCell = document.querySelector(`.container td[data-x="${nextPos[0]}"][data-y="${nextPos[1]}"]`)
        nextCell.innerText = '';
    }
        }
    });
});

function showAnswer  ( word ) {
    fetch('https://cors-anywhere.herokuapp.com/http://www.eki.ee/dict/ekss/index.cgi?Z=json&Q=+' + word)
    .then(res => res.json())
    .then(data => {
        messageDiv.innerHTML = 'Õige sõna: ' + randomWord.toUpperCase() + '<span class="tooltiptext">' + data.result + '</span>';
    });
}
