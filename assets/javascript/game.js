'use strict'

// Global Variables

let wins = 0;
let guessesLeft = 10;
let underScores = [];
let lettersGuessed = [];
let targetPerson;
let targetName;
let generatedNum;
let perviousRandomNum = [];
const wordBank = [
    {name: "Mozart",
    img:"assets/images/mozart.jpg",
    song:"assets/songs/mozart.mp3"}, 
    {name: "Beethoven",
    img:"assets/images/beethoven.jpg",
    song:"assets/songs/beethoven.mp3"}, 
    {name: "Bach",
    img:"assets/images/bach.jpg",
    song:"assets/songs/bach.mp3"},
    {name: "Brahms",
    img:"assets/images/brahms.jpg",
    song:"assets/songs/brahms.mp3"},
    {name: "Chopin",
    img:"assets/images/chopin.jpg",
    song:"assets/songs/chopin.mp3"},
    {name: "Tchaikovsky",
    img:"assets/images/tchaikovsky.jpg",
    song:"assets/songs/tchaikovsky.mp3"},
];

// At load of page
$(document).ready(function() {
    // Reset win counter
    $(".total-wins").append(wins);
    resetDOM();
    // Generate random number, use that number to determine target word and pass target word to starting the game    
    gameLevel(newWord(randomNum()));
});

const resetDOM = function() {
    // Reset guesses left # to 10
    $(".guesses-left").empty();
    // guessesLeft = 10;
    $(".guesses-left").append(guessesLeft);
    // Reset/clear letters guessed
    $(".letters-guessed").empty();
    lettersGuessed.length = 0
    underScores.length = 0;
    
};

// Generate random number expression
let randomNum = function() {
    let num = Math.floor(Math.random() * wordBank.length);
    // return num;
    if (perviousRandomNum.includes(num) === true) {
        // console.log(num);
        let num = Math.floor(Math.random() * wordBank.length);
        return num;
    } else {
        perviousRandomNum.push(num);
        // console.log(num);
        return num;
    }
}

// Start new word expression
const newWord = function(randomNumParam) {  
    // let targetPerson = pickRandomWord();    
    targetPerson = wordBank[randomNumParam];
    // Convert target word to array of letters
    // Create word-in-progress word array with same length as target word array that contains “_”
    // Display word-in-progress word array to DOM
    $(".working-word").empty();
    for (let i = 0; i < targetPerson.name.length; i++) {
        underScores.push("_");
        $(".working-word").append(`${underScores[i]} `);
    }
    return targetPerson;
};

const gameLevel = function(targetPerson) {
// execute new word expression
    targetName = targetPerson.name.toUpperCase().split("");
    // Listen for keystroke
    $(document).keyup(function(event) {
        // If keystroke is in the alphabet range
        if (event.which >=65 && event.which <= 90) {
            // Record letter pressed
            // Convert keystroke to lowercase
            let inputLetter = String.fromCharCode(event.which).toUpperCase(); 
            // If input letter is not already guessed
            if (lettersGuessed.includes(inputLetter) === false) {
                lettersGuessed.push(inputLetter);
                $(".letters-guessed").append(inputLetter + ", ");
             
                // check target word letters for a match with input letter
                if (targetName.indexOf(inputLetter) > -1) {
                    // If a match replace “_” with letter in under score array
                    for (let i = 0; i < targetName.length; i++) {
                        if (targetName[i] === inputLetter) {
                        underScores[i] = inputLetter;
                        }
                    }
                    // Reset working word in the DOM                   
                    $(".working-word").empty();
                    for (let i = 0; i < targetName.length; i++) {
                        $(".working-word").append(`${underScores[i]} `);
                    }
                    // Check if the word is complete
                    if (underScores.join("") === targetName.join("")) {                        
                        if (wins === 5) {
                            finalWin();
                            return;
                        } else {
                            displayWin();
                            resetDOM();
                            $(document).off( "keyup" );
                            gameLevel(newWord(randomNum()));
                        }
                    }
                // Else word incomplete
                } else {
                    $(".guesses-left").empty();
                    guessesLeft--;
                    $(".guesses-left").append(guessesLeft);
                    if (guessesLeft === 0) {
                        gameOver();
                    }
                }                                                 
            }        
        } 
    });    
};

const displayWin = function() {
    // Increment win #
    wins++;
    // reset win # on DOM
    $(".total-wins").empty();
    $(".total-wins").append(wins);
    // Reset/clear anything in winning visual panel
    $(".win-panel").empty();  
    // Display winning image to DOM
    $(".win-panel").append(`<h1>${targetPerson.name}</h1><br><img class = "img-responsive column-md-12" src = "${targetPerson.img}">`);
    $(".win-panel").append(`<audio controls autoplay><source src = "${targetPerson.song}"></audio>`);
};

const gameOver = function() {
    // Reset guesses left # to 0
    $(".guesses-left").empty();
    guessesLeft = 0;
    $(".guesses-left").append(guessesLeft);
    // Reset/clear letters guessed and remove from DOM
    $(".letters-guessed").empty();
    lettersGuessed.length = 0
    underScores.length = 0;
    // Get rid of working word form DOM and display Game Over
    $(".working-word").empty();
    $(".working-word").append("Game Over");
    // Turn off key press event listening
    $(document).off( "keyup" );
};

const finalWin = function() {
    // Reset/clear letters guessed and remove from DOM
    $(".letters-guessed").empty();
    lettersGuessed.length = 0
    underScores.length = 0;
    // Get rid of working word form DOM and display Game Over
    $(".working-word").empty();
    $(".working-word").append("You Win!");
    // Turn off key press event listening
    $(document).off( "keyup" );
};