/*-------------- Pseudocode -------------*/
// Define the word list:.
// - `harryPotterSpells`: Array of strings with HP spells
// - Select the word
//     - Select a **random** word from `harryPotterSpells`.
//     - Init game variables
//         - `secretWord`: Stores the randomly selected word from the chosen list.
//         - `guessedLetters`: An empty array to store the letters guessed.
//         - `wrongGuesses`: A counter, initialized to `0`.
//         - `maxWrongGuesses`: A constant, set to `10`.
//         - `displayWord`: An array of underscores, one for each letter of the `secretWord`.
// - Game loop/logic
//     - Display the game status.
//         - Show the `displayWord`.
//         - Show the number of `wrongGuesses` remaining.
//         - Show the letters that have already been guessed.
//     - Get player input
//         - Prompt user to enter a letter
//         - Validate input against previously entered values
//     - Process the guessed letter
//         - Add new letter to the `guessedLetters` array
//         - Check is `secrectWord` contains input letter
//             - If Yes, find all occurrences of the guessed letter and update the `displayWord` at the corresponding indices with the correct letter.
//             - If No, increment the `wrongGuesses` counter and display letter on`guessedLetters`
// - End of game
//     - After each correct guess, check if the `secrectWord` & `displayWord` are the same.
//         - If yes, the player won.
//             - else if, keep going.
//         - If the `wrongGuesses` reaches the `maxWrongGuesses` , the player loses. GAME OVER
// ______________________________________________________________________________________________________

/*-------------- Constants -------------*/
const harryPotterSpells = ["accio", "alohomora", "lumos", "expecto patronum", "crucio", "wingardium leviosa", "reparo", "obliviate", "expelliarmus", "nox", "petrificus totalus", "protego", "riddikulus"];
const maxWrongGuesses = 10;

/*---------- Variables (state) ---------*/
let secretWord = "";
let displayWord = [];
let guessedLetters= new Set ();
let wrongGuesses = 0;

/*----- Cached Element References  -----*/
const gameScreen = document.getElementById("game-screen");
const hpButton = document.getElementById("hp-button");
const hpLogo = document.getElementById("hp-logo");
const wordDisplay =document.getElementById("word-display");
const wrongGuessesText =document.getElementById("wrong-guesses-text")
const guessedLettersDisplay = document.getElementById("guessed-letters-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");
const restartButton = document.getElementById("restart-button");

/*-------------- Functions -------------*/
initGame = () =>{
     gameScreen.classList.remove("hidden");
     messageBox.classList.add("hidden");
     hpLogo.classList.remove("hidden");

     let wordList = harryPotterSpells;
     secretWord = wordList[Math.floor(Math.random() * wordList.length)];
     displayWord = Array(secretWord.length).fill("_");
     console.log("pssst: the word is: " , secretWord)
     guessedLetters.clear();
     wrongGuesses = 0;

     updateDisplay();
     guessInput.focus();
}

updateDisplay = () =>{
    wordDisplay.textContent = displayWord.join(' ');
    wrongGuessesText.textContent = `Incorrect guesses left: ${maxWrongGuesses - wrongGuesses}`;
    console.log(wrongGuessesText)
    guessedLettersDisplay.textContent = [...guessedLetters].join(", ");
    hpButton.classList.add("hidden");
    console.log(guessedLetters)
}

function showMessage(text) {
            messageText.textContent = text;
            messageBox.classList.remove("hidden");
}

validateGuess = () => {
    let guess = guessInput.value.toLowerCase().trim();
    guessInput.value = "";
    console.log(guess) //remove after validations

    if (guess.length !== 1 || !/[a-z]/.test(guess)){
        showMessage("Please enter only one -1- letter at a time.")
        console.log("Please enter only one -1- letter at a time.")
        return;
    }else if (guessedLetters.has(guess)){
        showMessage(`You have already used '${guess}'.`);
        console.log("You already guessed" `${guess}`) //remove after validations
        return;
    }
    else if (secretWord.includes(guess)){
        for (let i = 0; i < secretWord.length; i++) {
            if(secretWord[i] === guess){
                displayWord[i] = guess;
            }
        }
    } else {
        wrongGuesses++;
        guessedLetters.add(guess);
    }
    
    checkGame();
    guessedLetters.add(guess);
    updateDisplay();
    console.log(guessedLetters) //remove after validations
};

checkGame = () => {
     if (displayWord.join('')=== secretWord) {
        // player wins
        showMessage(`Well done! The spell was ${secretWord}. Go to Dumbledoor for house points!`)
        console.log("You won!")
     } else if (wrongGuesses >= maxWrongGuesses) {
        // player loses
        showMessage(`Your magic failed! Eat slugs! The spell was ${secretWord}.`);
        gameScreen.classList.add("hidden");
     }

}




/*----------- Event Listeners ----------*/
hpButton.addEventListener("click", () => initGame());
guessButton.addEventListener("click" , validateGuess);
restartButton.addEventListener("click", () => {
    messageBox.classList.add("hidden");
    guessInput.value = " "; 
    initGame();
});

guessInput.addEventListener("keyup", (event) =>{
    messageBox.classList.add("hidden");
    showMessage("");

    if (event.key === "Enter") {
        validateGuess();
    }
});
