$(document).ready(function () {
	
	
	
	$('#image').css('display', 'none');
	
	var timerNumber = 31;

	
	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;

	
	var answers = [];
	var currentQuestion = 0;



	
	var trivia = [
		q1 = {
			question: 'Who is the 13th president of the United States',
			correct: 0,
			multChoice: ['Millard Fillmore', 'Dwayne Johnson', 'Barack Obama', 'Justin Bieber'],
		},
		q2 = {
			question: 'When was the first iPhone released?',
			correct: 3,
			multChoice: ['September 2005', 'July 2007', 'May 2006', 'June 2007'],
		},
		q3 = {
			question: 'Whats 2+2',
			correct: 2,
			multChoice: ['21', '1000', '4', '99999'],
		},
		q4 = {
			question: 'Which company made the Playstation 4?',
			correct: 1,
			multChoice: ['Apple', 'Sony', 'Microsoft', '7-Eleven'],
		},
		q5 = {
			question: 'When was the first Macbook Pro released?',
			correct: 0,
			multChoice: ['January 2006', 'May 2007', 'July 2005', 'June 2004'],
		},
		q6 = {
			question: 'Why Did The Chicken Cross The Road?',
			correct: 2,
			multChoice: ['To Get Ran Over', 'He Saw His Girlfriend', 'To Get To The Otherside', 'Idk'],
		},
		q7 = {
			question: 'Is Water Wet',
			correct: 0,
			multChoice: ['NO!!!!', 'Duh!, Of Course!', 'Maybe', 'Pass'],
		},
		q8 = {
			question: 'Who Invented Electricity?',
			correct: 3,
			multChoice: ['Ariana Grande', 'Donald Trump', 'Abraham Lincoln', 'Benjamin Franklin'],
		}
	];

	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};
	
	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	
	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	
	var questionWrite = function () {
		if (currentQuestion <= 7) { 
			$('#questionDiv').html('<h2>' + trivia[currentQuestion].question + '</h2>');
			answers = trivia[currentQuestion].multChoice;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};

	
	var answerClear = function () {
		
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	
	
	var start = function() {
		
		counter = setInterval(countDown, 1000);

		
		$('#startTitle').empty();

		
		hide('#start');

		
		questionWrite();	
	};

	
	var clearScreen = function () {
		$('#startTitle').empty();
		$('#questionDiv').empty();
		$('#scoreDiv').empty();
		answerClear();
	}


	var countDown = function () {
	
		timerNumber --;
		
		$('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');

		
		if (timerNumber == 0) {
			gameOver();
		}
	};

	
	var stop = function () {
		clearInterval(counter);
	};

	
	var reset = function () {
		stop();
		timerNumber = 31;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#startTitle', 'Press Start Button to Begin!');
		show('#start');
		hide('#reset');
	};
	
	var gameOver = function() {
	
		stop();

		
		clearScreen();

	
		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scoreDiv').append('<h3>Here are your results</h3>');
		$('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
		$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		$('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
		show('#reset');
	};


	var nextQuestion = function () {
		$('#image').css('display', 'none');
		$('#questionDiv').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		timerNumber = 31;
	}


	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').attr('src', trivia[currentQuestion].gif);
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 5 * 1000);
			numAnswered ++;
			numCorrect ++;
			currentQuestion ++;
			questionWrite();
		}
		else {
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			timerNumber = 31;
			$('#questionDiv').empty();
			answerClear();
			questionWrite();
		}
	});

	
	$('#start').on("click", start);
	$('#reset').on('click', reset);
})
