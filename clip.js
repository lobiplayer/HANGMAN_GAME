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

const newRSetup = () => {
    input = letterField.value; //set input to the value inputted
    letterField.value = '' //resets the inputfield in the game
    pmessage.innerText = 'You have used this letter before'
    pmessage.style.visibility = 'hidden' //resets the visibilty of the message to hidden
}