//
// The Psychic Game
//
// The following Javascript implements the Psychic Game as described in 
// README.md. The game asks the user to guess a hidden letter. The user 
// wins if she guesses correctly. The user loses after guessing incorrectly 
// several times.
//

// Execute in strict mode as defined by the ECMAScript version 5 standard
"use strict";

//
// The game state is stored by a psychicGame object
// Game state includes wins, losses, guesses remaining, and the 
// set of guesses input by the user
//
var psychicGame = { 
	//
	// Game state properties
	//
	wins: 		0,
	losses: 	0, 
	guessesLeft: 9,
	guesses: 	"",
	goal: 		"a", 

	//
	// Return a constant  maximum guessses allowed
	//
	maxGuesses: function() { return 9; },

	// 
	// The reset function returns this object to an initial state
	//
	reset: function() {
		this.guessesLeft = this.maxGuesses();
		this.guesses = "";
		// Generate a lower case letter [a-z]
		// The ASCII character code for lower case 'a' is 97
		this.goal = String.fromCharCode(97 + Math.floor(Math.random() * 26));
	},

	// 
	// Log pertinent state information to the console
	//
	log: function() {
		console.log("Goal: " + this.goal + "\r");
		console.log("Guesses: " + this.guesses + "\r");
	},

	//
	// Output object state to the display
	//
	display: function() {
		// The HTML elements are fetched by ID attribute
		document.getElementById("wins").innerHTML = "Wins: " + this.wins;
		document.getElementById("losses").innerHTML = "Losses: " + this.losses;
		document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + this.guessesLeft;
		document.getElementById("guesses").innerHTML = "Your Guesses so far: " + this.guesses;

		// Write Game state to console for debugging purposes
		this.log();
	},

	//
	// Change the game state based on a letter input
	//
	guess: function(letter) {
		this.guessesLeft--;
		this.guesses += letter;

		if (letter === this.goal) {
			this.wins++;
			this.reset();
		}
		else if (this.guessesLeft == 0) {
			this.losses++;
			this.reset();
		}
	},
};

// MAIN PROCESS
// ==============================================================================

// Initialize a Game object
psychicGame.reset();

// Display the initial Game state
psychicGame.display();

// Captures keyboard input. Depending on the letter pressed it will "call" (execute) different functions.
document.onkeyup = function(event) {

	// Captures the key press, converts it to lowercase, and saves it to a variable.
	var letter = String.fromCharCode(event.keyCode).toLowerCase();

	// Update the Game state
	psychicGame.guess(letter);

	// Display the Game state
	psychicGame.display();
};