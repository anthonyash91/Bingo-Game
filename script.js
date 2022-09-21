const container = document.getElementById('bingo-cards'),
	computerOneCard = document.getElementById('computer-one'),
	playerCard = document.getElementById('player'),
	computerTwoCard = document.getElementById('computer-two'),
	gameTiles = document.querySelectorAll('.game-tiles .tile'),
	computerTiles = document.querySelectorAll('.computer-tiles .tile'),
	playerTiles = document.querySelectorAll('#player .game-tiles .tile'),
	winningNumbers = document.getElementById('winning-numbers'),
	winningNumbersContainer = document.getElementById('winning-numbers-container'),
	triviaQuestion = document.getElementById('random-question'),
	triviaAnswer = document.getElementById('trivia-answer'),
	correctAnswer = document.getElementById('correct-answer'),
	incorrectAnswer = document.getElementById('incorrect-answer'),
	playerName = document.getElementById('player-name'),
	blur = document.getElementById('blur'),
	modalOne = document.getElementById('modal-one'),
	modalTwo = document.getElementById('modal-two'),
	enableAutoMarkButton = document.querySelector('.enable'),
	noThanksButton = document.querySelector('.skip'),
	getStartedButton = document.getElementById('get-started'),
	nameInput = document.getElementById('enter-your-name'),
	cardBlur = document.getElementById('card-blur'),
	generateCardsButton = document.getElementById('generate-cards'),
	drawNumberButton = document.getElementById('draw-number'),
	resetGameButton = document.getElementById('reset-game'),
	starsDiv = document.querySelector('.stars'),
	colors = ['confetti-color-one', 'confetti-color-two', 'confetti-color-three', 'confetti-color-four', 'confetti-color-five', 'confetti-color-six'];

let winningNumbersArray = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30', 'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45', 'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60', 'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75'];
let chosenWinningNumbersArray = [];
let tileCounter = 0;
let tileCounterTwo = 0;
let chosenNumbersArray = [];
let autoplay = false;
let computerOneWins = false;
let playerWins = false;
let computerTwoWins = false;
let triviaQuestions = [
	{question: 'What is the former name of Istanbul?', answer: 'Constantinople'}, {question: 'In which year was the first Harry Potter book published?', answer: '1997'}, {question: 'The name of which household product is short for "water displacement, formulation successful in 40th attempt"?', answer: 'WD-40'}, {question: 'How many sides does a nonagon have?', answer: '9'}, {question: 'Off which country does the island of Zanzibar lie?', answer: 'Tanzinia'}, {question: 'What type of insect is a weevil?', answer: 'Beetle'}, {question: 'Which Disney cartoon character\'s love interest is named Megara?', answer: 'Hercules'}, {question: 'Which precious stones are found in the Namib desert in Africa?', answer: 'Diamonds'}, {question: 'What astronomical unit of distance equals about 5.88 trillion miles?', answer: 'Lightyear'}, {question: 'Which animal\'s name translates as "the lizard" in Spanish?', answer: 'Alligator'}, {question: 'Which city contains the most billionaires?', answer: 'Moscow'}, {question: 'The Spanish Civil War began in what year?', answer: '1936'}, {question: 'What is the capital of the US state of Delaware?', answer: 'Dover'}, {question: 'What was U.S. President Wilson\'s first name?', answer: 'Thomas'}, {question: 'Which US state is located between California and Utah?', answer: 'Nevada'}, {question: 'Machu Picchu is located in what country?', answer: 'Peru'}, {question: 'Acarophobia is the fear of what?', answer: 'Insects'}, {question: 'A male horse is known as a colt until it reaches what age?', answer: '5'}, {question: 'What is Mozart\'s full name?', answer: 'Wolfgang Amadeus Mozart'}, {question: 'The "Pentagon Papers" contained secret government information about what?', answer: 'The Vietnam War'}, {question: 'Hydraulics is the study of what?', answer: 'Fluids'}
];
let showQuestion = false;
let currentRandomNumber = [];
let chosenQuestions = [];
let currentQuestion = [];

nameInput.addEventListener('keypress', (evt) => {
	nameInput.classList.remove('shake');

	if (evt.key === 'Enter') {
		if(nameInput.value === '') {
			nameInput.classList.add('shake');
		} else {
			modalOne.classList.add('hide');

			setTimeout(() => {
				modalOne.style.opacity = 0;
				modalOne.style.visibility = 'hidden';
			}, 600);

			setTimeout(() => {
				modalTwo.classList.remove('hide');
				nameInput.value = '';
			}, 800);

			playerName.innerText = nameInput.value;
			setTimeout(() => {playerName.classList.remove('hide');}, 200);
		}
	}
})

enableAutoMarkButton.addEventListener('click', (evt) => {
	modalTwo.classList.add('animate');
	setTimeout(() => {
		modalTwo.style.opacity = 0;
		modalTwo.style.visibility = 'hidden';
		blur.classList.add('hide');
	}, 600);
	autoplay = true;
})

noThanksButton.addEventListener('click', (evt) => {
	modalTwo.classList.add('animate');
	setTimeout(() => {
		modalTwo.style.opacity = 0;
		modalTwo.style.visibility = 'hidden';
		blur.classList.add('hide');
	}, 600);
})

const generateCards = () => {
	let bingoNumbersArrays = {
		b: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 
		i: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], 
		n: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45], 
		g: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60], 
		o: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
	}

	const bingoKeys = Object.keys(bingoNumbersArrays);

	gameTiles.forEach((element, i) => {
		const chooseBingoNumbersArray = bingoNumbersArrays[bingoKeys[tileCounter]];
		const randomizeBingoNumbers = Math.floor(Math.random() * chooseBingoNumbersArray.length);
		const chooseRandomBingoNumber = chooseBingoNumbersArray[randomizeBingoNumbers];
		chosenNumbersArray.push(bingoKeys[tileCounter].toUpperCase() + chooseRandomBingoNumber);

		if(element.classList.contains('free-tile')) {
			i++
			setTimeout(() => {element.classList.add('hit');}, 300);
		} else {
			const randomFade = Math.floor(Math.random() * (530 - 300 + 1)) + 300;
			element.innerText = chooseRandomBingoNumber;
			element.setAttribute('data', bingoKeys[tileCounter].toUpperCase() + chooseRandomBingoNumber);
			element.parentElement.parentElement.classList.add(bingoKeys[tileCounter].toUpperCase() + chooseRandomBingoNumber);
			setTimeout(() => {element.classList.remove('hide');}, randomFade);
		}

		tileCounter++
		tileCounterTwo++

		if(tileCounter === 5) {
			tileCounter = 0;
		}

		if(tileCounterTwo === 25) {
				tileCounterTwo = 0;

				bingoNumbersArrays = {
					b: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], i: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], n: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45], g: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60], o: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
				}
			}

		chooseBingoNumbersArray.splice(chooseBingoNumbersArray.indexOf(chooseBingoNumbersArray[randomizeBingoNumbers]), 1);
	})
	
	generateCardsButton.classList.add('dim');
	drawNumberButton.classList.remove('dim');	
}

const checkForWinners = () => {
	const computerOneWinningConditions = [
		// horizontal wins
		[gameTiles[0],gameTiles[1],gameTiles[2],gameTiles[3],gameTiles[4]],
		[gameTiles[5],gameTiles[6],gameTiles[7],gameTiles[8],gameTiles[9]],
		[gameTiles[10],gameTiles[11],gameTiles[12],gameTiles[13],gameTiles[14]],
		[gameTiles[15],gameTiles[16],gameTiles[17],gameTiles[18],gameTiles[19]],
		[gameTiles[20],gameTiles[21],gameTiles[22],gameTiles[23],gameTiles[24]],
		// vertical wins
		[gameTiles[0],gameTiles[5],gameTiles[10],gameTiles[15],gameTiles[20]],
		[gameTiles[1],gameTiles[6],gameTiles[11],gameTiles[16],gameTiles[21]],
		[gameTiles[2],gameTiles[7],gameTiles[12],gameTiles[17],gameTiles[22]],
		[gameTiles[3],gameTiles[8],gameTiles[13],gameTiles[18],gameTiles[23]],
		[gameTiles[4],gameTiles[9],gameTiles[14],gameTiles[19],gameTiles[24]],
		// diagonal wins
		[gameTiles[0],gameTiles[6],gameTiles[12],gameTiles[18],gameTiles[24]],
		[gameTiles[4],gameTiles[8],gameTiles[12],gameTiles[16],gameTiles[20]],
		// four corners win
		[gameTiles[0],gameTiles[4],gameTiles[12],gameTiles[20],gameTiles[24]]
	]
	
	const playerWinningConditions = [
		// horizontal wins
		[gameTiles[25],gameTiles[26],gameTiles[27],gameTiles[28],gameTiles[29]],
		[gameTiles[30],gameTiles[31],gameTiles[32],gameTiles[33],gameTiles[34]],
		[gameTiles[35],gameTiles[36],gameTiles[37],gameTiles[38],gameTiles[39]],
		[gameTiles[40],gameTiles[41],gameTiles[42],gameTiles[43],gameTiles[44]],
		[gameTiles[45],gameTiles[46],gameTiles[47],gameTiles[48],gameTiles[49]],
		// vertical wins
		[gameTiles[25],gameTiles[30],gameTiles[35],gameTiles[40],gameTiles[45]],
		[gameTiles[26],gameTiles[31],gameTiles[36],gameTiles[41],gameTiles[46]],
		[gameTiles[27],gameTiles[32],gameTiles[37],gameTiles[42],gameTiles[47]],
		[gameTiles[28],gameTiles[33],gameTiles[38],gameTiles[43],gameTiles[48]],
		[gameTiles[29],gameTiles[34],gameTiles[39],gameTiles[44],gameTiles[49]],
		// diagonal wins
		[gameTiles[25],gameTiles[31],gameTiles[37],gameTiles[43],gameTiles[49]],
		[gameTiles[29],gameTiles[33],gameTiles[37],gameTiles[41],gameTiles[45]],
		// four corners win
		[gameTiles[25],gameTiles[29],gameTiles[37],gameTiles[45],gameTiles[49]]
	]
	
	const computerTwoWinningConditions = [
		// horizontal wins
		[gameTiles[50],gameTiles[51],gameTiles[52],gameTiles[53],gameTiles[54]],
		[gameTiles[55],gameTiles[56],gameTiles[57],gameTiles[58],gameTiles[59]],
		[gameTiles[60],gameTiles[61],gameTiles[62],gameTiles[63],gameTiles[64]],
		[gameTiles[65],gameTiles[66],gameTiles[67],gameTiles[68],gameTiles[69]],
		[gameTiles[70],gameTiles[71],gameTiles[72],gameTiles[73],gameTiles[74]],
		// vertical wins
		[gameTiles[50],gameTiles[55],gameTiles[60],gameTiles[65],gameTiles[70]],
		[gameTiles[51],gameTiles[56],gameTiles[61],gameTiles[66],gameTiles[71]],
		[gameTiles[52],gameTiles[57],gameTiles[62],gameTiles[67],gameTiles[72]],
		[gameTiles[53],gameTiles[58],gameTiles[63],gameTiles[68],gameTiles[73]],
		[gameTiles[54],gameTiles[59],gameTiles[64],gameTiles[69],gameTiles[74]],
		// diagonal wins
		[gameTiles[50],gameTiles[56],gameTiles[62],gameTiles[68],gameTiles[74]],
		[gameTiles[54],gameTiles[58],gameTiles[62],gameTiles[66],gameTiles[70]],
		// four corners win
		[gameTiles[50],gameTiles[54],gameTiles[62],gameTiles[70],gameTiles[74]]
	]

	for(let i = 0; i < 13; i++) {
		if(computerOneWinningConditions[i][0].classList.contains('hit') && computerOneWinningConditions[i][1].classList.contains('hit') && computerOneWinningConditions[i][2].classList.contains('hit') && computerOneWinningConditions[i][3].classList.contains('hit') && computerOneWinningConditions[i][4].classList.contains('hit')) {
			computerOneWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			computerOneWins = true;
		}

		if(playerWinningConditions[i][0].classList.contains('hit') && playerWinningConditions[i][1].classList.contains('hit') && playerWinningConditions[i][2].classList.contains('hit') && playerWinningConditions[i][3].classList.contains('hit') && playerWinningConditions[i][4].classList.contains('hit')) {
			playerWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			playerWins = true;
		}

		if(computerTwoWinningConditions[i][0].classList.contains('hit') && computerTwoWinningConditions[i][1].classList.contains('hit') && computerTwoWinningConditions[i][2].classList.contains('hit') && computerTwoWinningConditions[i][3].classList.contains('hit') && computerTwoWinningConditions[i][4].classList.contains('hit')) {
			computerTwoWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			computerTwoWins = true;
		}
	}

	if(computerOneWins || playerWins || computerTwoWins) {
		winningNumbersContainer.classList.add('hide');
		drawNumberButton.classList.add('hide');
		generateCardsButton.classList.replace('dim', 'hide');
		setTimeout(() => {resetGameButton.classList.remove('hide');}, 500);

		if(computerOneWins && playerWins && computerTwoWins) {
			container.classList.add('three-way-tie');
			setTimeout(() => {confettiCannon();}, 500);
		} else if(computerOneWins && playerWins && !computerTwoWins) {
			container.classList.add('computer-one-and-player-win');
			setTimeout(() => {confettiCannon();}, 500);
		} else if(computerOneWins && !playerWins && computerTwoWins) {
			container.classList.add('computer-one-and-computer-two-win');
			setTimeout(() => {confettiCannon();}, 500);
		} else if(!computerOneWins && playerWins && computerTwoWins) {
			container.classList.add('player-and-computer-two-win');
			setTimeout(() => {confettiCannon();}, 500);
		} else if(computerOneWins && !playerWins && !computerTwoWins) {
			container.classList.add('computer-one-win');
			setTimeout(() => {confettiCannon();}, 500);
		} else if(!computerOneWins && playerWins && !computerTwoWins) {
			container.classList.add('player-win');
			setTimeout(() => {confettiCannon();}, 500);
		} else if(!computerOneWins && !playerWins && computerTwoWins) {
			container.classList.add('computer-two-win');
			setTimeout(() => {confettiCannon();}, 500);
		}
	}
}

const showQuestionNumber = () => {
	const randomQuestionNum = Math.floor(Math.random() * (1000 - 0 + 1)) + 1;
	
	currentRandomNumber = [];
	currentRandomNumber.push(randomQuestionNum);

	if(randomQuestionNum % 3 === 0) {
		showQuestion = true; 
	} else {
		showQuestion = false;
	}
}

const drawNumber = () => {
	const randomizeWinningNumbers = Math.floor(Math.random() * winningNumbersArray.length);
	const chanceToHitComputerOne = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	const chanceToHitComputerTwo = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	const randomWinningNumber = winningNumbersArray[randomizeWinningNumbers];
	const winningNumber = document.createElement('div');
	
	if(chosenWinningNumbersArray.length != 75) {
		winningNumber.classList.add('winning-number', randomWinningNumber);
		setTimeout(() => {winningNumber.classList.add('show');}, 200);
		winningNumber.innerText = randomWinningNumber;

		if(winningNumber.classList.contains(randomWinningNumber) && !computerOneCard.classList.contains(randomWinningNumber) && !playerCard.classList.contains(randomWinningNumber) && !computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('no-match');
		} else if(winningNumber.classList.contains(randomWinningNumber) && computerOneCard.classList.contains(randomWinningNumber) && playerCard.classList.contains(randomWinningNumber) && computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('computers-player');
			showQuestionNumber();
			if(autoplay && showQuestion) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 500);}
			if(!autoplay) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 300);}
		} else if(winningNumber.classList.contains(randomWinningNumber) && computerOneCard.classList.contains(randomWinningNumber) && !playerCard.classList.contains(randomWinningNumber) && !computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('only-computer-one');
		} else if(winningNumber.classList.contains(randomWinningNumber) && !computerOneCard.classList.contains(randomWinningNumber) && playerCard.classList.contains(randomWinningNumber) && !computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('only-player');
			showQuestionNumber();
			if(autoplay && showQuestion) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 500);}
			if(!autoplay) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 300);}
		} else if(winningNumber.classList.contains(randomWinningNumber) && !computerOneCard.classList.contains(randomWinningNumber) && !playerCard.classList.contains(randomWinningNumber) && computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('only-computer-two');
		} else if(winningNumber.classList.contains(randomWinningNumber) && computerOneCard.classList.contains(randomWinningNumber) && playerCard.classList.contains(randomWinningNumber) && !computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('computer-one-player');
			showQuestionNumber();
			if(autoplay && showQuestion) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 500);}
			if(!autoplay) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 300);}
		} else if(winningNumber.classList.contains(randomWinningNumber) && computerOneCard.classList.contains(randomWinningNumber) && !playerCard.classList.contains(randomWinningNumber) && computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('computer-one-computer-two');
		} else if(winningNumber.classList.contains(randomWinningNumber) && !computerOneCard.classList.contains(randomWinningNumber) && playerCard.classList.contains(randomWinningNumber) && computerTwoCard.classList.contains(randomWinningNumber)) {
			winningNumber.classList.add('player-computer-two');
			showQuestionNumber();
			if(autoplay && showQuestion) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 500);}
			if(!autoplay) {setTimeout(() => {drawNumberButton.classList.add('dim');}, 300);}
		}

		winningNumbers.prepend(winningNumber);
		winningNumbersArray.splice(winningNumbersArray.indexOf(winningNumbersArray[randomizeWinningNumbers]), 1);
		chosenWinningNumbersArray.push(randomWinningNumber);
	}

	computerTiles.forEach(element => {
		if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
			if(chanceToHitComputerOne >= 3 && element.classList.contains('computer-one-tile')) {
				setTimeout(() => {element.classList.add('hit');}, 300);
			} else if(chanceToHitComputerOne < 3 && element.classList.contains('computer-one-tile')) {
				const missedHit = document.createElement('div');
				missedHit.classList.add('computer-one-miss', 'miss', 'hide');
				missedHit.innerText = 'miss';
				
				if(!computerOneWins && !playerWins && !computerTwoWins) {
					setTimeout(() => {container.appendChild(missedHit);}, 400);
				};
				
				setTimeout(() => {missedHit.classList.replace('hide', 'show');}, 600);
				setTimeout(() => {missedHit.classList.replace('show', 'hide');}, 1700);
				setTimeout(() => {missedHit.remove();}, 2000);
			}

			if(chanceToHitComputerTwo >= 3 && element.classList.contains('computer-two-tile')) {
				setTimeout(() => {element.classList.add('hit');}, 300);
			} else if(chanceToHitComputerTwo < 3 && element.classList.contains('computer-two-tile')) {
				const missedHit = document.createElement('div');
				missedHit.classList.add('computer-two-miss', 'miss', 'hide');
				missedHit.innerText = 'miss';
				
				if(!computerOneWins && !playerWins && !computerTwoWins) {
					setTimeout(() => {container.appendChild(missedHit);}, 400);
				};
				
				setTimeout(() => {missedHit.classList.replace('hide', 'show');}, 600);
				setTimeout(() => {missedHit.classList.replace('show', 'hide');}, 1700);
				setTimeout(() => {missedHit.remove();}, 2000);
			}
		}
	})
	
	if(autoplay) {
		playerTiles.forEach(element => {
			if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
				if(showQuestion) {
					const randomizeQuestions = Math.floor(Math.random() * (triviaQuestions.length - 1 + 1)) + 0;
					const pickQuestion = triviaQuestions[randomizeQuestions];
 
					if(triviaQuestions.length > 0) {
						currentQuestion = [];
						chosenQuestions.push(pickQuestion);
						currentQuestion.push(pickQuestion);
						setTimeout(() => {cardBlur.classList.replace('hide', 'show');}, 500);
						triviaQuestion.innerText = pickQuestion.question;
						triviaQuestions.splice(randomizeQuestions, 1);
					}

					triviaAnswer.addEventListener('keypress', (evt) => {
						triviaAnswer.classList.remove('shake');
						if(evt.key === 'Enter') {
							if(triviaAnswer.value === '') {
								triviaAnswer.classList.add('shake');
							} else {
								if(triviaAnswer.value.toLowerCase() === currentQuestion[0].answer.toLowerCase()) {
									cardBlur.classList.replace('show', 'hide');
									
									if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
										cardBlur.classList.replace('show', 'hide');

										setTimeout(() => {
											correctAnswer.classList.remove('hide');
											playerName.classList.add('hide');
										}, 200);

										setTimeout(() => {
											element.classList.add('hit');
											drawNumberButton.classList.remove('dim');
										}, 300);

										setTimeout(() => {
											correctAnswer.classList.add('hide');
											playerName.classList.remove('hide');
										}, 800);
									}
								} else {
									cardBlur.classList.replace('show', 'hide');

									setTimeout(() => {
										incorrectAnswer.classList.remove('hide');
										playerName.classList.add('hide');
									}, 200);

									setTimeout(() => {
										drawNumberButton.classList.remove('dim');
										element.setAttribute('data', 'lost-tile');
									}, 300);

									setTimeout(() => {
										incorrectAnswer.classList.add('hide');
										playerName.classList.remove('hide');
									}, 800);
								}

								setTimeout(() => {triviaAnswer.value = '';}, 400);
							}
						}
					})
				} else {
					setTimeout(() => {element.classList.add('hit');}, 300);
					drawNumberButton.classList.remove('dim');
				}
			}
		})
	} else {
		playerTiles.forEach(element => {
			const getTileAttribute = element.getAttribute('data');
			if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
				element.style.cursor = 'pointer';
				
				const showQ = () => {
					if(showQuestion) {
							const randomizeQuestions = Math.floor(Math.random() * (triviaQuestions.length - 1 + 1)) + 0;
							const pickQuestion = triviaQuestions[randomizeQuestions];

							if(triviaQuestions.length > 0) {
								currentQuestion = [];
								chosenQuestions.push(pickQuestion);
								currentQuestion.push(pickQuestion);
								cardBlur.classList.replace('hide', 'show');
								triviaQuestion.innerText = pickQuestion.question;
								triviaQuestions.splice(randomizeQuestions, 1);
							}

							triviaAnswer.addEventListener('keypress', (evt) => {
								triviaAnswer.classList.remove('shake');
								if(evt.key === 'Enter') {
									if(triviaAnswer.value === '') {
										triviaAnswer.classList.add('shake');
									} else {
										if(triviaAnswer.value.toLowerCase() === currentQuestion[0].answer.toLowerCase()) {
											cardBlur.classList.replace('show', 'hide');

											if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
												setTimeout(() => {element.classList.add('hit');}, 300);
												drawNumberButton.classList.remove('dim');

												setTimeout(() => {
													correctAnswer.classList.remove('hide');
													playerName.classList.add('hide');
												}, 200);
			
												setTimeout(() => {
													correctAnswer.classList.add('hide');
													playerName.classList.remove('hide');
												}, 800);
											}

											element.style.cursor = 'default';
											element.setAttribute('data', 'won-tile');
											element.removeEventListener("click", showQ);
											setTimeout(() => {triviaAnswer.value = '';}, 400);
										} else {
											cardBlur.classList.replace('show', 'hide');
											drawNumberButton.classList.remove('dim');
											element.setAttribute('data', 'lost-tile');
											element.style.cursor = 'default';
											element.removeEventListener("click", showQ);
										}
									}
								}
							})
						} else {
							setTimeout(() => {element.classList.add('hit');}, 100);
							drawNumberButton.classList.remove('dim');
							element.style.cursor = 'default';
							element.removeEventListener("click", showQ);
						}
				}
				
				element.addEventListener('click', showQ);
			}
		})
	}
	
	setTimeout(() => {
		console.log('check for winners')
		checkForWinners();
	}, 400)
}

generateCardsButton.addEventListener('click', generateCards);
drawNumberButton.addEventListener('click', drawNumber);

const confettiCannon = () => {
		for(let i = 0; i < 500; i++) {
				const star = document.createElement('div');
				let randomizeColors = Math.floor(Math.random() * colors.length);
				let starSize = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
				let starPositionOne = Math.ceil(Math.random() * 1200) * (Math.round(Math.random()) ? 1 : -1);
				let starPositionTwo = Math.ceil(Math.random() * 1200) * (Math.round(Math.random()) ? 1 : -1);
				let starSpeed = Math.floor(Math.random() * (1 - 0.5 + 1)) + 0.5;
				let borderRadius = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
				let rotate = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
				let triangleSize = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
				let triangleSizeTwo = triangleSize * 2;

				star.classList.add('starzz', colors[randomizeColors]);
				star.style.borderRadius = `${borderRadius}px`
				star.style.transition = `all ${starSpeed}s`;
				star.style.transform = `rotate(${rotate}deg)`
				star.style.height = `${starSize}px`;
				star.style.width = `${starSize}px`;

				setTimeout(() => {
					star.style.marginTop = `${starPositionOne}px`;
					star.style.marginLeft = `${starPositionTwo}px`;
					star.style.opacity = 1;
				}, 100)

				if(i % 5 === 0) {
					star.classList.add('triangle');
					star.style.borderRadius = '0px';
					star.style.backgroundColor = 'transparent';
					star.style.borderRight = `${triangleSize}px solid transparent`;
					star.style.borderLeft = `${triangleSize}px solid transparent`;
					star.style.borderBottom = `${triangleSizeTwo}px solid`;
				}

				starsDiv.appendChild(star);
			}
}

const removeConfetti = () => {
	document.querySelectorAll('.starzz').forEach(element => {
		element.style.opacity = 0;
		setTimeout(() => {element.remove();}, 500);
	})
}

const resetGame = () => {
	for(let i of chosenWinningNumbersArray) {
		winningNumbersArray.push(i);
	}

	for(let i of chosenQuestions) {
		triviaQuestions.push(i);
	}
	
	setTimeout(() => {
		while(winningNumbers.firstChild) {
			winningNumbers.removeChild(winningNumbers.firstChild);
		}
	}, 250)

	gameTiles.forEach(element => {
		const randomFade = Math.floor(Math.random() * (430 - 300 + 1)) + 300;

		setTimeout(() => {
			element.classList.remove('hit', 'winner');
		}, 300);

		element.removeAttribute('data');
		element.style.cursor = 'default';
		container.classList = '';
		element.parentElement.parentElement.classList = 'bingo-card';
		
		if(!element.classList.contains('free-tile')) {
			setTimeout(() => {
				element.classList.add('hide');
			}, randomFade);

			setTimeout(() => {element.innerText = '';}, 450);
		}
	})
	
	autoplay = false;
	tileCounter = 0;
	tileCounterTwo = 0;
	computerOneWins = false;
	playerWins = false;
	computerTwoWins = false;
	showQuestion = false;
	currentRandomNumber = [];
	chosenQuestions = [];
	currentQuestion = [];
	
	removeConfetti();
	setTimeout(() => {
		generateCardsButton.classList.remove('dim', 'hide');
		drawNumberButton.classList.replace('hide', 'dim');
		winningNumbersContainer.classList.remove('hide');

		blur.classList.remove('hide');
		blur.classList.add('slow');
		modalOne.removeAttribute('style');
		modalOne.classList.remove('hide');
		modalTwo.classList.add('hide');
		modalTwo.classList.remove('animate');
		playerName.innerText = '';
	}, 600);

	modalOne.removeAttribute('style');
	modalTwo.removeAttribute('style');
	setTimeout(() => {blur.classList.remove('slow');}, 700);
	resetGameButton.classList.add('hide');

	chosenWinningNumbersArray = [];
	chosenNumbersArray = [];
}

resetGameButton.addEventListener('click', resetGame);