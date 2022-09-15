const tiles = document.querySelectorAll('.tile'),
playerHeaderTiles = document.querySelectorAll('#player .header-tile'),
computerTiles = document.querySelectorAll('#computer .tile'),
playerTiles = document.querySelectorAll('#player .tile'),
player = document.getElementById('player'),
computer = document.getElementById('computer'),
generateCardsButton = document.querySelector('.generate-cards'),
bingoCards = document.querySelectorAll('.bingo-card'),
playerNames = document.querySelectorAll('.player-name'),
playerNameSpans = document.querySelectorAll('.player-name span'),
winningNumbersDiv = document.getElementById('winning-number'),
chooseNumbersDiv = document.getElementById('choose-numbers'),
chooseWinningNumberButton = document.querySelector('.choose-winning-number');

let autoplay = false;
let winningNumbers = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30', 'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45', 'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60', 'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75'];
let chosenNums = [];
// this will count up by 1 each time a tile is iterated over; this is is used to determine which array inside the bingoNumbers object to use when choosing a random number and placing it into a tile
let tileCounter = 0;

setTimeout(() => {
	bingoCards.forEach(element => {
		element.classList.remove('start');
	})
}, 800)

setTimeout(() => {
	playerNameSpans.forEach(element => {
		element.classList.replace('hide', 'show')
	})
}, 1000)

setTimeout(() => {
	playerNames.forEach(element => {
		element.classList.add('extend')
	})
}, 1400)

const generateCards = () => {
	const bingoNumbers = {
		b: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		i: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
		n: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
		g: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
		o: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
	}

	// select the correct array in the bingoNumbers object by using one of the keys (b,i,n,g,o)
	const bingoLetters = Object.keys(bingoNumbers);

	// iterate over every tile
	tiles.forEach((element, i) => {
		// iterate through the correct array in the bingoNumbers object; bingoNumbers = the object; bingoLetters = use the keys inside the bingoNumbers object; tileCounter = the index of the key inside the object (0 = b, 1 = i, 2 = n, 3 = g, 4 = o)
		const bingoNumbersArray = bingoNumbers[bingoLetters[tileCounter]];
		// randomize the numbers in the correct array in the bingoNumbers object
		const randomizeArrayNumbers = Math.floor(Math.random() * bingoNumbersArray.length);
		// select a random number from the current array in the bingoNumbers object
		const pickNum = bingoNumbersArray[randomizeArrayNumbers];
		const randomFade = Math.floor(Math.random() * (530 - 300 + 1)) + 300;
		// remove the number just selected from the current array so it can't be picked again in the next row
		bingoNumbersArray.splice(bingoNumbersArray.indexOf(bingoNumbersArray[randomizeArrayNumbers]), 1);
		// if the tile being iterated over contains a class of either 'header-square' or 'free-spot', skip it and add 1 to tileCounter
		element.classList.contains('header-tile') && i++;
		element.classList.contains('free-tile') && i++;
		element.classList.replace('show-number', 'hide-number');

		setTimeout(() => {
			element.classList.replace('hide-number', 'show-number');
		}, randomFade)

		if(!element.classList.contains('header-tile') && !element.classList.contains('free-tile')) {
			setTimeout(() => {
				element.innerText = pickNum;
			}, 200)

			element.setAttribute('data', bingoLetters[tileCounter].toUpperCase() + pickNum);
			element.parentElement.parentElement.classList.add(bingoLetters[tileCounter].toUpperCase() + pickNum)
		}

		// add 1 to the tile counter for every square iterated over (with the exceptions noted)
		tileCounter++
		// once the tile counter hits 5 (the amount of tiles in a row), restart the tile counter; the current tileCounter number is what dictates from which array in the bingoNumbers object to pull a number
		5 === tileCounter && (tileCounter = 0);
		// only place a number into the tile being iterated over if that tile does not contain a class of 'header-square' or 'free-spot', then add a data attribute that consists of the column letter and the tile's number; this will be used for "marking" the tile once a winning number is called
	})

	chooseWinningNumberButton.classList.replace('hide', 'show');
	document.querySelector('.generate-cards').classList.add('hide');

	setTimeout(() => {
		tiles.forEach(element => {			
			if(element.classList.contains('free-tile')){
				element.classList.add('hit');
			}
		})
	}, 500)
}

generateCardsButton.addEventListener('click', generateCards);

const pickWinningNum = () => {
	const randomizeWinningNumbers = Math.floor(Math.random() * winningNumbers.length);
	const winningNumber = winningNumbers[randomizeWinningNumbers];
	const newNumber = document.createElement('div');
	winningNumbers.splice(winningNumbers.indexOf(winningNumbers[randomizeWinningNumbers]), 1);
	newNumber.classList.add('winning-numbers', 'hide', winningNumber);

	if(newNumber.classList.contains(winningNumber) && player.classList.contains(winningNumber)){
		newNumber.classList.add('color-one');
	} else if(newNumber.classList.contains(winningNumber) && computer.classList.contains(winningNumber)) {
		newNumber.classList.add('color-two');
	} else {
		newNumber.classList.add('color-three');
	}

	newNumber.innerHTML = `${winningNumber}`;

	if(chosenNums.length != 75){
		setTimeout(() => {
			newNumber.classList.replace('hide', 'show')  
		},200)

		winningNumbersDiv.prepend(newNumber);
		chosenNums.push(winningNumber);
	}

	// logic for auto dabbing card
	setTimeout(() => {
		if(autoplay){
			tiles.forEach(element => {
				if(element.getAttribute('data') === winningNumber && chosenNums.includes(winningNumber)){
					element.classList.add('hit');
				}
			})
		} else {
			computerTiles.forEach(element => {
				if(element.getAttribute('data') === winningNumber && chosenNums.includes(winningNumber)){
					element.classList.add('hit');
				}
			})

			tiles.forEach(element => {
				if(element.getAttribute('data') === winningNumber && chosenNums.includes(winningNumber) && !element.classList.contains('hit')) {
					element.style.cursor = 'pointer';
				}

				element.addEventListener('click', (evt) => {
					element.style.cursor = 'default';
				})
			})
		}

		checkForWinners();
	}, 500)
	
	player.addEventListener('click', (evt) => {
		if(evt.target.getAttribute('data') === winningNumber && chosenNums.includes(winningNumber)) {
			evt.target.classList.add('hit');
		}

		checkForWinners();
	})
}

chooseWinningNumberButton.addEventListener('click', pickWinningNum);

const checkForWinners = () => {
	const loser = ['l','o','s','e','r'];
	const playerWinningConditions = [
		// horizontal
		[tiles[5],tiles[6],tiles[7],tiles[8],tiles[9]],
		[tiles[10],tiles[11],tiles[12],tiles[13],tiles[14]],
		[tiles[15],tiles[16],tiles[17],tiles[18],tiles[19]],
		[tiles[20],tiles[21],tiles[22],tiles[23],tiles[24]],
		[tiles[25],tiles[26],tiles[27],tiles[28],tiles[29]],
		// four corners
		[tiles[5],tiles[9],tiles[17],tiles[25],tiles[29]],
		// vertical
		[tiles[5],tiles[10],tiles[15],tiles[20],tiles[25]],
		[tiles[6],tiles[11],tiles[16],tiles[21],tiles[26]],
		[tiles[7],tiles[12],tiles[17],tiles[22],tiles[27]],
		[tiles[8],tiles[13],tiles[18],tiles[23],tiles[28]],
		[tiles[9],tiles[14],tiles[19],tiles[24],tiles[29]],
		// diagonol
		[tiles[5],tiles[11],tiles[17],tiles[23],tiles[29]],
		[tiles[9],tiles[13],tiles[17],tiles[21],tiles[25]]
	]

	const computerWinningConditions = [
		// horizontal
		[tiles[35],tiles[36],tiles[37],tiles[38],tiles[39]],
		[tiles[40],tiles[41],tiles[42],tiles[43],tiles[44]],
		[tiles[45],tiles[46],tiles[47],tiles[48],tiles[49]],
		[tiles[50],tiles[51],tiles[52],tiles[53],tiles[54]],
		[tiles[55],tiles[56],tiles[57],tiles[58],tiles[59]],
		// four corners
		[tiles[35],tiles[39],tiles[47],tiles[55],tiles[59]],
		// vertical
		[tiles[35],tiles[40],tiles[45],tiles[50],tiles[55]],
		[tiles[36],tiles[41],tiles[46],tiles[51],tiles[56]],
		[tiles[37],tiles[42],tiles[47],tiles[52],tiles[57]],
		[tiles[38],tiles[43],tiles[48],tiles[53],tiles[58]],
		[tiles[39],tiles[44],tiles[49],tiles[54],tiles[59]],
		// diagonal
		[tiles[35],tiles[41],tiles[47],tiles[53],tiles[59]],
		[tiles[39],tiles[43],tiles[47],tiles[51],tiles[55]]
	]

	let playerWins = false;
	let computerWins = false;
	let loserCounter = 0;

	for(let i = 0; i < playerWinningConditions.length; i++) {
		if(playerWinningConditions[i][0].classList.contains('hit') && playerWinningConditions[i][1].classList.contains('hit') && playerWinningConditions[i][2].classList.contains('hit') && playerWinningConditions[i][3].classList.contains('hit') && playerWinningConditions[i][4].classList.contains('hit')) {
			playerWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			playerWins = true;
		}
	}

	for(let i = 0; i < computerWinningConditions.length; i++) {
		if(computerWinningConditions[i][0].classList.contains('hit') && computerWinningConditions[i][1].classList.contains('hit') && computerWinningConditions[i][2].classList.contains('hit') && computerWinningConditions[i][3].classList.contains('hit') && computerWinningConditions[i][4].classList.contains('hit')) {
			computerWinningConditions[i].forEach(element => {
				element.classList.add('winner');
			})

			computerWins = true;
		}
	}
	
	if(playerWins || computerWins){
		chooseNumbersDiv.classList.add('hide');
	}

	if(playerWins){
		computer.style.transform = 'rotate(10deg)';
		
		computerTiles.forEach((element, i) => {
			if(loserCounter === 5){
				loserCounter = 0
			}

			element.innerText = loser[loserCounter];
			loserCounter++
		})

		document.querySelector('#computer .player-name span').innerText = loser.join('');
	}

	if(computerWins){
		player.style.transform = 'rotate(-10deg)';
		
		playerTiles.forEach((element, i) => {
			if(loserCounter === 5){
				loserCounter = 0
			}

			element.innerText = loser[loserCounter];
			loserCounter++
		})

		document.querySelector('#player .player-name span').innerText = loser.join('');
	}
}

document.querySelector('button.auto').addEventListener('click', () => {
	autoplay = true;
})