/*-------------- Pseudocode -------------*/
// Define the word list:.
// - `harryPotterSpells`: Array of strings with Harry Potter spells
// - `lotrCharacters` : Array of strings with Lord of the Rings characters
// - Select the theme: Harry Potter spells or Lord of the Rings characters
// - Open selected game screen
// - Select the word
//     - Select a **random** word from `harryPotterSpells` or `lotrCharacters`.
//     - Declare game variables
//         - `currentTheme` : A variable storing the theme selected by the player in the homepage 
//         - `secretWord`: A variable storing the randomly selected word from the chosen list.
//         - `guessedLetters`: An empty array to store the letters guessed.
//         - `wrongGuesses`: A counter, initialized to `0`.
//         - `maxWrongGuesses`: A constant, set to `10`.
//         - `displayWord`: An array of underscores, one for each letter of the `secretWord`.
// - Game loop/logic
//     - Start the game with the selected theme
//         - Show the `displayWord`.
//     - Display the game status.
//         - Show the number of `wrongGuesses` remaining.
//         - Show the letters that have already been guessed.
//     - Get player input
//         - Prompt user to enter a letter
//         - Validate `guessInput` for a-z entries only
//         - Validate `guessInput` against previously entered values (`guessedLetters`).
//         - Capture user `guessInput`
//     - Process the guessed letter
//         - Add new letter to the `guessedLetters` array
//         - Check is `secrectWord` contains input letter
//             - If Yes, find all occurrences of the guessed letter and update the `displayWord` at the corresponding indices with the correct letter.
//             - If No, increment the `wrongGuesses` counter and display letter on`guessedLetters`
// - End of game
//     - After each correct guess, check if the `secrectWord` & `displayWord` are the same.
//         - If yes, the player won.
//         - Display theme respective Win message
//             - else if, keep going.
//         - If the `wrongGuesses` reaches the `maxWrongGuesses` , the player loses. GAME OVER
//         - Display theme respective Lose message
// - Restart game 
//     - Display Play Again button 
//     - Define restart to clear user input, guessed letters and wrong guesses number, hide themed backgrounds, and return to the theme selection screen.
// ______________________________________________________________________________________________________

/*-------------- Constants -------------*/
const harryPotterSpells = ["accio", "alohomora", "lumos", "expecto patronum", "crucio", "wingardium leviosa", "reparo", "obliviate", "expelliarmus", "nox", "petrificus totalus", "protego", "riddikulus"];
const lotrCharacters = ["frodo", "gandalf", "aragorn", "legolas", "gollum", "sam", "pippin", "merry", "saruman", "eowyn", "gimli", "sauron", "boromir"];
const maxWrongGuesses = 10;

/*---------- Variables (state) ---------*/
let secretWord = "";
let displayWord = [];
let guessedLetters= new Set ();
let wrongGuesses = 0;
let currentTheme = "";

/*----- Cached Element References  -----*/
const themeSelection = document.getElementById("theme-selection");
const gameScreen = document.getElementById("game-screen");
const hpButton = document.getElementById("hp-button");
const lotrButton = document.getElementById("lotr-button");
const hpLogo = document.getElementById("hp-logo");
const lotrLogo = document.getElementById("lotr-logo");
const wordDisplay =document.getElementById("word-display");
const wrongGuessesText =document.getElementById("wrong-guesses-text")
const guessedLettersDisplay = document.getElementById("guessed-letters-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");
const restartButton = document.getElementById("restart-button");

/*-------------- Functions -------------*/
const initGame = (theme) =>{
    themeSelection.classList.add("hidden"); 
    gameScreen.classList.remove("hidden");
    messageBox.classList.add("hidden");
    hpLogo.classList.add("hidden");
    lotrLogo.classList.add("hidden");
    if (theme === "harry-potter") {
        hpLogo.classList.remove("hidden");
    } else if (theme === "lotr") {
        lotrLogo.classList.remove("hidden");
    }


    let wordList = [];
    currentTheme = theme;
     if(theme ==="harry-potter"){
        wordList = harryPotterSpells;
     } else if (theme === "lotr"){
        wordList = lotrCharacters;
     }

     secretWord = wordList[Math.floor(Math.random() * wordList.length)];
     displayWord = Array(secretWord.length).fill("_");
     console.log("pssst: the word is: " , secretWord)
     guessedLetters.clear();
     wrongGuesses = 0;

     updateDisplay();
     guessInput.focus();
}


const updateDisplay = () =>{
    wordDisplay.textContent = displayWord.join(' ');
    wrongGuessesText.textContent = `Incorrect guesses left: ${maxWrongGuesses - wrongGuesses}`;
    guessedLettersDisplay.textContent = [...guessedLetters].join(", ");
    hpButton.classList.add("hidden");
    lotrButton.classList.add("hidden");
}

const showMessage = (text) => {
        messageBox.classList.remove("hidden");
        messageText.textContent = text;
         
}

const validateGuess = () => {
    let guess = guessInput.value.toLowerCase().trim();
    guessInput.value = "";

    if (guess.length !== 1 || !/[a-z]/.test(guess)){
        showMessage("Please enter only a letter.")
        restartButton.classList.add("hidden");
        return;
    }else if (guessedLetters.has(guess)){
        showMessage(`You have already used '${guess}'.`);
        restartButton.classList.add("hidden");
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
    restartButton.hidden;
};

const checkGame = () => {
     if (displayWord.join('')=== secretWord && currentTheme === "harry-potter") {
        // player wins
        showMessage(`🌟 Well done 🌟! The spell was "${secretWord}". Go to Dumbledoor for house points!`)
        restartButton.classList.remove("hidden");
     } else if (displayWord.join('')=== secretWord && currentTheme === "lotr") {
        // player wins
        showMessage(`🌟 Well done 🌟! The character was "${secretWord}". Gandalf would be proud!`)
        restartButton.classList.remove("hidden");
     } else if (wrongGuesses >= maxWrongGuesses && currentTheme === "harry-potter") {
        // player loses
        showMessage(`Your magic failed 👎 ! Eat slugs! The spell was "${secretWord}".`);
        gameScreen.classList.add("hidden");
        restartButton.classList.remove("hidden");
     } else if (wrongGuesses >= maxWrongGuesses && currentTheme === "lotr") {
        // player loses
        showMessage(`You failed 👎 ! The orks are coming for you! The spell was "${secretWord}".`);
        gameScreen.classList.add("hidden");
        restartButton.classList.remove("hidden");
     }
};



/*----------- Event Listeners ----------*/
hpButton.addEventListener("click", () => initGame("harry-potter"));
lotrButton.addEventListener("click", () => initGame("lotr"));
guessButton.addEventListener("click" , validateGuess);
restartButton.addEventListener("click", () => {
  gameScreen.classList.add("hidden");
  themeSelection.classList.remove("hidden");
  hpButton.classList.remove("hidden");
  lotrButton.classList.remove("hidden");
  hpLogo.classList.add("hidden");
  lotrLogo.classList.add("hidden");
  messageBox.classList.add("hidden");
  guessInput.value = "";
  displayWord = [];
  guessedLetters.clear();
  wrongGuesses = 0;
  secretWord = "";
  currentTheme = "";
});

guessInput.addEventListener("keyup", (event) =>{
    showMessage("");
    messageBox.classList.add("hidden");

    if (event.key === "Enter") {
        validateGuess();
    }
});
