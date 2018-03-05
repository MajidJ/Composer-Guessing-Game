'use strict'

// Global Variables
const wordBank = [
    {name: "Mozart",
    img:"assets/images/mozart.jpg"}, 
    {name: "Beethoven",
    img:"assets/images/beethoven.jpg"}, 
    {name: "Bach",
    img:"assets/images/bach.jpg"}, 
];
let underScores = [];
let wins = 0;
let lettersGuessed = [];



// At load of page
$(document).ready(function() {
// Reset win counter
    $(".total-wins").append(wins);
// Start new word expression
    const newWord = function() {
// Reset guesses left # to 10
        let guessesLeft = 10;
        $(".guesses-left").append(guessesLeft);
// Reset/clear letters guessed
        let lettersGuessed = [];
        $(".letters-guessed").empty(); 
// Reset/clear anything in winning visual panel
        $(".win-panel").empty();   
// Reset/clear hangmen pieces in visual

// Pick a random word from array (array of objects?) as target word
        let targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
// Convert target word to array of letters
            
// Determine length of target word array

// Create word-in-progress word array with same length as target word array that contains “_”
// Display word-in-progress word array to DOM
        for (let i = 0; i < targetWord.name.length; i++) {
            underScores.push("_");
            $(".working-word").append(`${underScores[i]} `);
        }
    }
// execute new word expression
    newWord();
// Listen for keystroke
    $(document).keyup(function(e) {
// If keystroke is in the alphabet range
        let inputLetter;
        if (e.which >=65 && e.which <= 90) {
// Record letter pressed
// Convert keystroke to lowercase
            let inputLetter = String.fromCharCode(e.which).toLowerCase(); 
            console.log(inputLetter);
            console.log(e.which);
// Loop through letters guessed array to check if input letter is not already guessed
            for (let i = 0; i < lettersGuessed.length; i++) {
                if (inputLetter === lettersGuessed[i]) {

                }
            }
// Loop through target word letters for a match

// If a match 

// replace “_” with letter

// If the word is complete

// Increment win #

// Display image and song to DOM corresponding to target word
// $(".win-panel").append(`<img class = "img-responsive column-md-12" src = "${targetWord.img}">`);
// Else word incomplete

// Change nothing, continue loop

// Else if letter is not in word, 

// display letter in letters guessed 

// Display hangmen piece to visual

// decrement guesses left #

// If guesses left # = 0

// Alert a loss

// Else if letter is already guessed, 

// change nothing
        
// Else keystroke is not in the alphabet
        } 
// Change nothing

    });
});
