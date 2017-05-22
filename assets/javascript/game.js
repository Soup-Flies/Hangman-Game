var guessedLetters = [];
var currentWord;
var success = [];
var score = 0;
var remainingGuesses = 6;
var guess;
var wordList = ['Galaga', 'Arkanoid', 'Gauntlet', 'Centipede', 'Contra', 'Galaxian', 'Millipede', 'Tron', 'SpyHunter', 'Commando', 'Asteroids', 'Tetris', 'Frogger', 'Defender', 'Joust']; 
var correctCount = 0;
var wait = true;


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
	$("#score").text(score);
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
			drawAliens();
			$("#lives").text(remainingGuesses);
			if (remainingGuesses >= 1) {
				$("#guesses").append(guess + " ");
			} else {
				$("#guesses").append(guess);
			}
		}

		if (remainingGuesses == 0) {
			gameLoss();	
		}
		
		}
		if (correctCount == currentWord.length) {
			gameWin();
			console.log(success, guessedLetters, correctCount);
		}
}

//Resets game board
function resetBoard() {
	$("#display").empty();
	$("#guesses").empty();
	replay = false;
	guessedLetters = [];
	success = [];
	remainingGuesses = 6;
	correctCount = 0;
	setWord();
	$("#overscan").empty();
	first = false;
	$("#overscan").append('<img id="base" src="./assets/images/city.png" alt="Base">');
} 

function gameLoss() {
	$(document).ready(function() {
		score -= 50;
		var replay = confirm("All out of quarters man... \nAsk your mom for more?");
		if (replay) {
			resetBoard();
		}
	});
}

var offset = null;
var first = false;

//Handles the invaders bootstrap controls to visualize lives
function drawAliens() {
		if (offset == false) {
			$("#overscan").prepend('<div class="row" style="height: 38px"/>')
			$(".invaders").addClass("col-xs-offset-1");
			offset = true;
		} else if (offset == true) {
			$("#overscan").prepend('<div class="row" style="height: 38px"/>')
			$(".invaders").removeClass("col-xs-offset-1");
			offset = false;
		}

		if (first == false) {
			$("#overscan").append('<div class="row">');
			for (var i = 0; i < 3; i++) {
				$("#overscan").append('<img class="col-xs-3 invaders" src="./assets/images/invader.png" alt="Invader"/>')
			}
			$("#overscan").append('</div>');
			first = true;
			offset = false;
		}
		
}


//Displays win screen
function gameWin() {
	$(document).ready(function() {
		score += 100;
		$("#score").text(score);
		var replay = confirm("Congratulations! \nThe word was " + currentWord + " \nPlay again?");
		if (replay) {
			resetBoard();	
		}
	})
		
}

//Drops title from off screen
function titleDrop() {
	$( "#title" ).animate({
    opacity: 1,
    height: 300,
  }, 2000 );
};

//Takes guesses and updates the blanks with correct guesses
function updateBlanks(letter) {
	success.push(letter);

	for (var i = 0; i < currentWord.length; i++) {
		if (letter == currentWord[i]) {
			$("#" + i).text(currentWord[i] + " ");
			correctCount++;
			score += 25;
			$("#score").text(score);
		}
	}		
}


$(document).ready(function() {
	titleDrop();
	setWord();
	document.onkeyup = guessCheck;
})