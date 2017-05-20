

var guessedLetters = [];
var currentWord;
var success = [];
var wins = 0;
var remainingGuesses = 8;
var guess;
var wordList = ['Galaga', 'Arkanoid', 'Gauntlet', 'Centipede', 'Contra']; 




function setWord() {
	//Randomly choose word from wordbank
	var rand = Math.floor(Math.random() * wordList.length);
	currentWord = wordList[rand].toLowerCase();
	console.log(currentWord);

	//Display blanks on HTML
	for (var i = 0; i < currentWord.length; i++) {
		if (i != currentWord.length - 1) {
			$("#display").append('<span id="' + i + '">_ </span>');
		} else {
			$("#display").append('<span id="' + i + '">_</span>');
		}
	}
}

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
		}

		if (remainingGuesses == 0) {
			alert("Game over man!");
		}
		console.log(success, guessedLetters);
	}
}

function gameWin() {

}

function updateBlanks(letter) {
	success.push(letter);

	for (var i = 0; i < currentWord.length; i++) {
		if (letter == currentWord[i]) {
			$("#" + i).text(currentWord[i] + " " );
		}
	}
		
}


$(document).ready(function() {
	setWord();
	document.onkeyup = guessCheck;

})