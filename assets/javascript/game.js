


var guessedLetters = [];
var currentWord;
var success = [];
var wins = 0;
var remainingGuesses = 8;
var guess;
var wordList = ['Galaga', 'Arkanoid', 'Gauntlet', 'Centipede', 'Contra']; 




function setWord() {
	var rand = Math.floor(Math.random() * wordList.length);
	currentWord = wordList[rand].toLowerCase();
	console.log(currentWord);
}

function guessCheck(event) {
	console.log(event.keyCode);
	if (event.keyCode <= 90 && event.keyCode >= 65 && $.inArray(event.key, guessedLetters)) {
		var guess = event.key;
		console.log('guess is ' + guess);
	
		if ($.inArray(guess, currentWord) != -1 && $.inArray(guess, success) == -1) {
			success.push(guess);
			console.log(guess + " is in " + currentWord);
		} else if (($.inArray(guess, guessedLetters) == -1) && $.inArray(guess, currentWord) == -1) {
			guessedLetters.push(guess);
			remainingGuesses--;
		}

		if (remainingGuesses == 0) {
			alert("Game over man!");
		}
		console.log(success, guessedLetters);
	}
}


$(document).ready(function() {
	setWord();
	document.onkeyup = guessCheck;

})