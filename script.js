const bingoCards = document.querySelectorAll('.bingo-card'),
playerCard = document.getElementById('player-card'),
computerCard = document.getElementById('computer-card'),
allTiles = document.querySelectorAll('.tile'),
playerTiles = document.querySelectorAll('#player-card .tile'),
computerTiles = document.querySelectorAll('#computer-card .tile'),
freeTiles = document.querySelectorAll('.free-tile'),
gameTiles = document.querySelectorAll('.game-tiles .tile'),
names = document.querySelectorAll('.name'),
playerName = document.querySelector('#player-card .name span'),
autoMarkButton = document.querySelector('#auto-mark input'),
winningNumbersContainer = document.getElementById('winning-numbers'),
generateCardsButton = document.getElementById('generate-cards'),
drawANumberButton = document.getElementById('draw-a-number'),
resetGameButton = document.getElementById('reset-game'),
blur = document.getElementById('blur'),
modalOne = document.getElementById('modal-one'),
modalTwo = document.getElementById('modal-two'),
getStartedButton = document.getElementById('get-started'),
nameInput = document.getElementById('enter-your-name'),
winningNumbersArray = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30', 'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45', 'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60', 'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75']

let chosenWinningNumbersArray = [],
chosenNumbersArray = [],
tileCounter = 0,
tileCounterTwo = 0,
autoplay = false,
playerWins = false,
computerWins = false,
loserCounter = 0;

const startGame = () => {
  modalOne.classList.add('hide');

	setTimeout(() => {
		modalOne.style.opacity = 0;
		modalOne.style.visibility = 'hidden';
	}, 600);

	setTimeout(() => {modalTwo.classList.remove('hide');}, 800);
}

nameInput.addEventListener('keypress', (evt) => {
	if (evt.key === 'Enter') {
		evt.preventDefault();
		
		bingoCards.forEach(element => {
			element.classList.add('start');
		})
		
		names.forEach(element => {
			element.classList.add('show');
			setTimeout(() => {element.classList.add('expand')}, 600);
		})

		setTimeout(() => {document.getElementById('gradient').classList.remove('hide');}, 400);
		blur.classList.add('hide');
		playerName.innerText = nameInput.value;
	}
})

// winning conditions
const checkForWinners = () => {
	const playerWinningConditions = [
		// horizontal
		[allTiles[5],allTiles[6],allTiles[7],allTiles[8],allTiles[9]],
		[allTiles[10],allTiles[11],allTiles[12],allTiles[13],allTiles[14]],
		[allTiles[15],allTiles[16],allTiles[17],allTiles[18],allTiles[19]],
		[allTiles[20],allTiles[21],allTiles[22],allTiles[23],allTiles[24]],
		[allTiles[25],allTiles[26],allTiles[27],allTiles[28],allTiles[29]],
		// four corners
		[allTiles[5],allTiles[9],allTiles[17],allTiles[25],allTiles[29]],
		// vertical
		[allTiles[5],allTiles[10],allTiles[15],allTiles[20],allTiles[25]],
		[allTiles[6],allTiles[11],allTiles[16],allTiles[21],allTiles[26]],
		[allTiles[7],allTiles[12],allTiles[17],allTiles[22],allTiles[27]],
		[allTiles[8],allTiles[13],allTiles[18],allTiles[23],allTiles[28]],
		[allTiles[9],allTiles[14],allTiles[19],allTiles[24],allTiles[29]],
		// diagonol
		[allTiles[5],allTiles[11],allTiles[17],allTiles[23],allTiles[29]],
		[allTiles[9],allTiles[13],allTiles[17],allTiles[21],allTiles[25]]
	]

	const computerWinningConditions = [
		// horizontal
		[allTiles[35],allTiles[36],allTiles[37],allTiles[38],allTiles[39]],
		[allTiles[40],allTiles[41],allTiles[42],allTiles[43],allTiles[44]],
		[allTiles[45],allTiles[46],allTiles[47],allTiles[48],allTiles[49]],
		[allTiles[50],allTiles[51],allTiles[52],allTiles[53],allTiles[54]],
		[allTiles[55],allTiles[56],allTiles[57],allTiles[58],allTiles[59]],
		// four corners
		[allTiles[35],allTiles[39],allTiles[47],allTiles[55],allTiles[59]],
		// vertical
		[allTiles[35],allTiles[40],allTiles[45],allTiles[50],allTiles[55]],
		[allTiles[36],allTiles[41],allTiles[46],allTiles[51],allTiles[56]],
		[allTiles[37],allTiles[42],allTiles[47],allTiles[52],allTiles[57]],
		[allTiles[38],allTiles[43],allTiles[48],allTiles[53],allTiles[58]],
		[allTiles[39],allTiles[44],allTiles[49],allTiles[54],allTiles[59]],
		// diagonal
		[allTiles[35],allTiles[41],allTiles[47],allTiles[53],allTiles[59]],
		[allTiles[39],allTiles[43],allTiles[47],allTiles[51],allTiles[55]]
	]
	
	for(let i = 0; i < playerWinningConditions.length; i++) {
		if(playerWinningConditions[i][0].classList.contains('hit') && playerWinningConditions[i][1].classList.contains('hit') && playerWinningConditions[i][2].classList.contains('hit') && playerWinningConditions[i][3].classList.contains('hit') && playerWinningConditions[i][4].classList.contains('hit')) {
			playerWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			playerWins = true;
			console.log('player wins');
		}
	}
	
	for(let i = 0; i < computerWinningConditions.length; i++) {
		if(computerWinningConditions[i][0].classList.contains('hit') && computerWinningConditions[i][1].classList.contains('hit') && computerWinningConditions[i][2].classList.contains('hit') && computerWinningConditions[i][3].classList.contains('hit') && computerWinningConditions[i][4].classList.contains('hit')) {
			computerWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			computerWins = true;
			console.log('computer wins');
		}
	}
	
	if(playerWins || computerWins) {
		drawANumberButton.classList.add('hide');
		resetGameButton.classList.remove('hide');
		winningNumbersContainer.classList.add('hide');
		document.getElementById('gradient').classList.add('hide');
	}
	
	if(playerWins && !computerWins) {
		playerCard.style.zIndex = 9;
		playerCard.classList.add('win');
		computerCard.classList.add('lose');
	} else if(computerWins && !playerWins) {
		computerCard.style.zIndex = 9;
		computerCard.classList.add('win');
		playerCard.classList.add('lose');
	}
}


const auto = () => {
  if(autoplay === false) {
		autoplay = true;

    setTimeout(() => {
      allTiles.forEach(element => {
        if(chosenWinningNumbersArray.includes(element.getAttribute('data'))) {
          element.classList.add('hit');
        }
      })
    }, 400)

		document.querySelector('#label svg').classList.add('hide');
		document.querySelector('#label-message').classList.add('hide');
		checkForWinners();
	} else {
		autoplay = false;
		document.querySelector('#label svg').classList.remove('hide');
		document.querySelector('#label-message').classList.remove('hide');
	}
}

const pickAWinner = () => {
  let bingoNumbers = {
		b: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		i: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
		n: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
		g: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
		o: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
	}

	// select the correct array in the bingoNumbers object by using one of the keys (b,i,n,g,o)
	const bingoLetters = Object.keys(bingoNumbers);

	gameTiles.forEach((element, i) => {
		// iterate through the correct array in the bingoNumbers object; bingoNumbers = the object; bingoLetters = use the keys inside the bingoNumbers object; tileCounter = the index of the key inside the object (0 = b, 1 = i, 2 = n, 3 = g, 4 = o)
		const bingoNumbersArray = bingoNumbers[bingoLetters[tileCounter]];
		// randomize the numbers in the correct array in the bingoNumbers object
		const randomizeArrayNumbers = Math.floor(Math.random() * bingoNumbersArray.length);
		// select a random number from the current array in the bingoNumbers object
		const pickNum = bingoNumbersArray[randomizeArrayNumbers];
		const randomFade = Math.floor(Math.random() * (530 - 300 + 1)) + 300;
		
		chosenNumbersArray.push(bingoLetters[tileCounter].toUpperCase() + pickNum);
		// if the tile being iterated over contains a class of either 'header-square' or 'free-spot', skip it and add 1 to tileCounter
		element.classList.contains('header-tile') && i++;
		element.classList.contains('free-tile') && i++;
		element.classList.replace('show', 'hide');
	
		setTimeout(() => {element.classList.replace('hide', 'show');}, randomFade);

		if(!element.classList.contains('header-tile') && !element.classList.contains('free-tile')) {
			setTimeout(() => {
				element.innerText = pickNum;
			}, 200)

			element.setAttribute('data', bingoLetters[tileCounter].toUpperCase() + pickNum);
			element.parentElement.parentElement.classList.add(bingoLetters[tileCounter].toUpperCase() + pickNum)
		}
	
		setTimeout(() => {
			freeTiles.forEach(element => {
				element.classList.add('hit');
			})
		}, 400)

		tileCounter++
		tileCounterTwo++

		if(tileCounter === 5) {
			tileCounter = 0;
		}
		
		if(tileCounterTwo === 30) {
			tileCounterTwo = 0;

			bingoNumbers = {
				b: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
				i: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
				n: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
				g: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
				o: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
			}
		}
		
		// remove the number just selected from the current array so it can't be picked again in the next row
		bingoNumbersArray.splice(bingoNumbersArray.indexOf(bingoNumbersArray[randomizeArrayNumbers]), 1);
	})

	winningNumbersContainer.classList.remove('hide');
	generateCardsButton.classList.add('hide');
	drawANumberButton.classList.remove('hide');
}

const drawNumber = () => {
  // choose a random number from the winningNumbers array
	const randomizeWinningNumbers = Math.floor(Math.random() * winningNumbersArray.length);
	const randomWinningNumber = winningNumbersArray[randomizeWinningNumbers];
	const numberSpan = `<span>${randomWinningNumber.charAt(0)}</span>${randomWinningNumber.slice(1)}`;
	const div = document.createElement('div');

	// display a new number when the "draw a number" button is clicked until all of the winning numbers've been chosen
	if(chosenWinningNumbersArray.length != 75) {
		div.classList.add('number', randomWinningNumber);	
		div.innerHTML = numberSpan;

    div.classList.contains(randomWinningNumber) && playerCard.classList.contains(randomWinningNumber) && computerCard.classList.contains(randomWinningNumber) ? div.classList.add("color-one") : div.classList.contains(randomWinningNumber) && playerCard.classList.contains(randomWinningNumber) ? div.classList.add("color-two") : div.classList.contains(randomWinningNumber) && computerCard.classList.contains(randomWinningNumber) ? div.classList.add("color-three") : div.classList.add("color-four");

		setTimeout(() => {div.classList.add('show');}, 100);

		winningNumbersContainer.prepend(div);
		// once a number is picked from the winningNumbers array, remove it from the array so it cannot be picked again
		winningNumbersArray.splice(winningNumbersArray.indexOf(winningNumbersArray[randomizeWinningNumbers]), 1);
		// push the number picked from the winningNumbers array to the chosenWinningNumbers array; this is used for reset game purposes
		chosenWinningNumbersArray.push(randomWinningNumber);
	}

	if(autoplay) {
		allTiles.forEach(element => {
			if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
				setTimeout(() => {
					element.classList.add('hit');
					checkForWinners();
				}, 400)
			}
		})
	} else {
		computerTiles.forEach(element => {
			if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
				setTimeout(() => {
					element.classList.add('hit');
					checkForWinners();
				}, 400)
			}
		})

		playerTiles.forEach(element => {
			if(element.getAttribute('data') === randomWinningNumber && chosenWinningNumbersArray.includes(randomWinningNumber)) {
				element.style.cursor = 'pointer';

				element.addEventListener('click', (evt) => {
					element.classList.add('hit');
					element.style.cursor = 'default';
					checkForWinners();
				})
			}
		})
	}
}

const reset = () => {
  // push the numbers in the chosenWinningsNumbers array back into the winningNumbers array
	for (var i of chosenWinningNumbersArray) {
		winningNumbersArray.push(i);
	}
	
	// remove all the appended numbers from the winning-numbers div
	setTimeout(() => {
		while (winningNumbersContainer.firstChild) {
			winningNumbersContainer.removeChild(winningNumbersContainer.firstChild);
		}
	}, 250)

	gameTiles.forEach(element => {
		element.classList.remove('hit', 'winner');

		setTimeout(() => {
			if(!element.classList.contains('header-tile') && !element.classList.contains('free-tile')) {
				element.innerText = '';
			}
		}, 200)

		element.removeAttribute('data');

		if(!element.classList.contains('free-tile')) {
			element.classList.replace('show', 'hide');
		}

		element.style.cursor = 'default';
	})

	bingoCards.forEach(element => {
		element.classList = 'bingo-card';
		element.classList.add('start');
	})

	autoplay = false;
	autoMarkButton.checked = false;
	playerWins = false;
	computerWins = false;
	loserCounter = 0;

	document.querySelector('#label svg').classList.remove('hide');
	document.querySelector('#label-message').classList.remove('hide');
	setTimeout(() => {document.getElementById('gradient').classList.remove('hide');}, 400);

	computerCard.classList.remove('win', 'lose');
	playerCard.classList.remove('win', 'lose');

	resetGameButton.classList.add('hide');
	generateCardsButton.classList.remove('hide');

	setTimeout(() => {winningNumbersContainer.classList.remove('hide');}, 300);

	// reset the chosenWinningNumbers array
	chosenWinningNumbersArray = [];
}

// event handlers
getStartedButton.addEventListener('click', startGame);
autoMarkButton.addEventListener('click', auto);
generateCardsButton.addEventListener('click', pickAWinner);
drawANumberButton.addEventListener('click', drawNumber);
resetGameButton.addEventListener('click', reset);