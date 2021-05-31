//import the soundeffects:

const correct = new Audio('./mediafiles/audio/correct.mp3')
const incorrect = new Audio('./mediafiles/audio/incorrect.mp3')
const win = new Audio('./mediafiles/audio/win.mp3')
const lose = new Audio('./mediafiles/audio/lose.flac')

//chooses random a word from a list
let word = ''

fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

        console.log(data)
        word = data[0]
        document.getElementById('storeword').innerText = data[0]
    })

console.log(word)
// $.ajax({
//     url: 'https://random-word-api.herokuapp.com/word?number=1',
//     method: "GET",
//     success: function (result) {
//       word = (result[0])
//     },
//     error: function (error) {
//         console.log(`Error: ${error}`);
//     }
// });

const wordList = ['hello', 'malaysia', 'netherlands', 'astrazeneca', 'correct', 'javascript', 'coffee'];

// const randomWordselector = (wordArray) => {
//     return wordArray[Math.floor(Math.random() * wordArray.length)];
// };

// let word = randomWordselector(wordList);

//now make easy JS variables of the dom elements:
let hangman = document.getElementById('hangman');
let wordInGame = document.getElementById('wordingame');
let letterField = document.getElementById('letterfield');
let pmessage = document.getElementById('pmessage')
let playAgainButtonDiv = document.getElementById('playagaindiv')
//set hangmang images in an array so that I can select them easily
let hangmangimages = ["./mediafiles/images/Hangman game jpeg/png/6lives.png", "./mediafiles/images/Hangman game jpeg/png/5lives.png", "./mediafiles/images/Hangman game jpeg/png/4lives.png", "./mediafiles/images/Hangman game jpeg/png/3lives.png", "./mediafiles/images/Hangman game jpeg/png/2lives.png", "./mediafiles/images/Hangman game jpeg/png/1lives.png", "./mediafiles/images/Hangman game jpeg/png/0lives.png", "./mediafiles/images/Hangman game jpeg/png/won.png"]

// make an array that keeps track of the letters that have been tried.
let arrayAlreadyInputed = []

// make an counter that tracks how many life the user has.
let lifeCounter = 0;

//place the _ _ _ _ _ _ in the game
let wordInArray = []
for (i = 0; i < word.length; i++) {
    wordInArray.push('_')
}

wordInGame.innerText = wordInArray.join('')

let input = ''

const playerLost = () => {
    pmessage.innerText = 'You have lost.'
    pmessage.style.visibility = 'visible'
    lose.play();
    playAgainButtonDiv.style.visibility = 'visible'
}

const playerGuesesWrongLetter = () => {
    lifeCounter++
    incorrect.play();
    console.log('lifecounter' + lifeCounter)
    hangman.src = hangmangimages[lifeCounter]; //selects the hangman image depending of the lifes
}

const playerGuesesCorrectLetter = () => {
    wordInArray[i] = input; //the letters will be revealed in the wordarray
    correct.play();
}

const playerWon = () => {
    hangman.src = hangmangimages[7]; //displays winning image
    pmessage.innerText = 'You have won.'
    pmessage.style.color = 'lightgreen'
    pmessage.style.visibility = 'visible'
    win.play();
    playAgainButtonDiv.style.visibility = 'visible'
}

const newRoundSetup = () => {
    input = letterField.value; //set input to the value inputted
    letterField.value = '' //resets the inputfield in the game
    pmessage.innerText = 'You have used this letter before'
    pmessage.style.visibility = 'hidden' //resets the visibilty of the message to hidden
}

//the code that runs when a letter has been inputed:
letterField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) { //this fires when the enter key goes up
        event.preventDefault();
        newRoundSetup()
        if (!arrayAlreadyInputed.includes(input)) { //checks if the letter hasn't been used before
            arrayAlreadyInputed.push(input); //adds to the already used array if this was the first the the letter has been used.
            for (i = 0; i < word.length; i++) { //iterates through the word
                if (word[i] == input) { //if the letter in word is same as input ...
                    playerGuesesCorrectLetter()
                    if (!wordInArray.includes('_')) { //if there is no _ anymore, that means the user won the game
                        playerWon()
                    }
                }
            }
            if (!word.includes(input)) {
                playerGuesesWrongLetter()
                if (lifeCounter == 6) { //if the counter has reached 6, that means that the player has lost.
                    playerLost()
                }
            }
            console.log(wordInArray)
            wordInGame.innerText = wordInArray.join('') //join the array to a string to show on html
        }
        else {
            pmessage.style.visibility = 'visible'
        }
    }
});

playAgainButtonDiv.onclick = function () {
    document.location.reload();
}