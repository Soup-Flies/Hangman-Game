

var guessedLetters = [];
var currentWord;
var success = [];
var wins = 0;
var remainingGuesses = 8;
var guess;
var wordList = ['Galaga', 'Arkanoid', 'Gauntlet', 'Centipede', 'Contra', 'Galaxian', 'Millipede']; 
var correctCount = 0;


//Randomly choose word from word bank and setup blanks for the word
function setWord() {

	var rand = Math.floor(Math.random() * wordList.length);
	currentWord = wordList[rand].toLowerCase();
	console.log(currentWord);


	for (var i = 0; i < currentWord.length; i++) {
		if (i != currentWord.length - 1) {
			$("#display").append('<span class="letter" id="' + i + '">_ </span>');
		} else {
			$("#display").append('<span class="letter" id="' + i + '">_</span>');
		}
	}
	$("#lives").text(remainingGuesses);
}


//Takes keyboard input and tests whether or not it is in current word
function guessCheck(event) {
	console.log(event.keyCode);
	if (event.keyCode <= 90 && event.keyCode >= 65 && $.inArray(event.key, guessedLetters)) {
		var guess = event.key;
		console.log('guess is ' + guess);
	
		if ($.inArray(guess, currentWord) != -1 && $.inArray(guess, success) == -1) {
			updateBlanks(guess);
			console.log(guess + " is in " + currentWord);

			
		} else if (($.inArray(guess, guessedLetters) == -1) && $.inArray(guess, currentWord) == -1) {
			guessedLetters.push(guess);
			remainingGuesses--;
			$("#lives").text(remainingGuesses);
			if (remainingGuesses > 1) {
				$("#guesses").append(guess + " ");
			} else {
				$("#guesses").append(guess);
			}
		}

		if (remainingGuesses == 0) {
			alert("Game over man!");
			if (replay) {

			}
			
		}

		
		
		}
		if (correctCount == currentWord.length) {
			gameWin();
		console.log(success, guessedLetters, correctCount);
	}
}

//Resets game board
function resetBoard() {
	
} 

//Displays win screen
function gameWin() {
	var replay = confirm("Play again?");
	if (replay) {
		guesses = [];
		remainingGuesses = 8;
		wins++;
		replay = false;
		setWord();
	}
}

//Takes guesses and updates the blanks with correct guesses
function updateBlanks(letter) {
	success.push(letter);

	for (var i = 0; i < currentWord.length; i++) {
		if (letter == currentWord[i]) {
			$("#" + i).text(currentWord[i] + " ");
			correctCount++;
		}
	}
		
}


$(document).ready(function() {
	setWord();
	document.onkeyup = guessCheck;

})