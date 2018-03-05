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
// let targetPerson = [];
// let targetName;


// Start new word expression
const newWord = function() {
// Reset guesses left # to 10
    let guessesLeft = 10;
    $(".guesses-left").append(guessesLeft);
// Reset/clear letters guessed
    let lettersGuessed = [];
    $(".letters-guessed").empty(); 
 
// Reset/clear hangmen pieces in visual
    let targetPerson = pickRandomWord();    
// Create word-in-progress word array with same length as target word array that contains “_”
// Display word-in-progress word array to DOM
    $(".working-word").empty();
    for (let i = 0; i < targetPerson.name.length; i++) {
        underScores.push("_");
        $(".working-word").append(`${underScores[i]} `);
    }
    return targetPerson;
}

const pickRandomWord = function() {
    // Pick a random word from array (array of objects?) as target word
    let targetPerson = wordBank[Math.floor(Math.random() * wordBank.length)];
    // Convert target word to array of letters
    console.log(targetPerson.name);
    return targetPerson;
}

const displayWin = function(personObject) {
    // Increment win #
    wins++;
    // reset win # on DOM
    $(".total-wins").empty();
    $(".total-wins").append(wins);
    // Reset/clear anything in winning visual panel
    $(".win-panel").empty();  
    // Display winning image to DOM
    $(".win-panel").append(`<img class = "img-responsive column-md-12" src = "${personObject.img}">`);
    
}


// At load of page
$(document).ready(function() {
// Reset win counter
    $(".total-wins").append(wins);
// execute new word expression
    let targetPerson = newWord();
    let targetName = targetPerson.name.toUpperCase().split("");
    console.log(typeof targetName, targetName);
// Listen for keystroke
    $(document).keyup(function(event) {
// If keystroke is in the alphabet range
        if (event.which >=65 && event.which <= 90) {
// Record letter pressed
// Convert keystroke to lowercase
            let inputLetter = String.fromCharCode(event.which).toUpperCase(); 
            console.log(inputLetter);
            console.log(event.which);
// If input letter is not already guessed
            if (lettersGuessed.includes(inputLetter) === false) {
                lettersGuessed.push(inputLetter);
                $(".letters-guessed").append(inputLetter + ", ");
             
// check target word letters for a match with input letter
                if (targetName.indexOf(inputLetter) > -1) {
// If a match replace “_” with letter in under score array
                    console.log("letter included");
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
                    console.log(targetName);
                    console.log(underScores);
// Check if the word is complete
                    if (underScores.join("") == targetName.join("")) {                        
                        displayWin(targetPerson);
                        // newWord();
                    }
// Display image and song to DOM corresponding to target word
// Else word incomplete
                }           
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
        } 
// Change nothing

    });
});
