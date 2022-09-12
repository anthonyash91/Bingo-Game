const columnB = document.querySelectorAll('.column-b'),
columnI = document.querySelectorAll('.column-i'),
columnN = document.querySelectorAll('.column-n'),
columnG = document.querySelectorAll('.column-g'),
columnO = document.querySelectorAll('.column-o'),
bingoCard = document.getElementById('bingo-card'),
squares = document.querySelectorAll('.square');

let winningNumbers = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30', 'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45', 'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60', 'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75'];

let chosenNums = [];

const generateBoardNums = () => {
	const numbers = {b: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], i: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], n: [31,32,33,34,35,36,37,38,39,40,41,42,43,45,45], g: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60], o: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]};
	
	squares.forEach(element => {
		element.classList.replace('show-number', 'hide-number');
	})

	for(let i = 0; i < columnB.length; i++) {
		// pick a random number from the b array
    let randomizeNums = Math.floor(Math.random() * numbers.b.length);
		let randomNum = numbers.b[randomizeNums];
		// remove the random number just picked from the b array so it can't be picked again when the loop iterates; this ensures there are no repeating numbers in the column
		numbers.b.splice(numbers.b.indexOf(numbers.b[randomizeNums]), 1);
    // pick a random number that will act as the setTimeout interval so each number fades in at a different speed
		let randomNumFade = Math.floor(Math.random() * (530 - 100 + 1)) + 100;

		setTimeout(() => {
			columnB[i].innerText = `B${randomNum}`;
			columnB[i].classList.replace('hide-number', 'show-number');
		}, randomNumFade)

		columnB[i].setAttribute('data', `B${randomNum}`);
	}

	for(let i = 0; i < columnI.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.i.length);
		let randomNum = numbers.i[randomizeNums];
		let randomNumFade = Math.floor(Math.random() * (530 - 200 + 1)) + 200;
		numbers.i.splice(numbers.i.indexOf(numbers.i[randomizeNums]), 1);
		
		setTimeout(() => {
			columnI[i].innerText = `I${randomNum}`;
			columnI[i].classList.replace('hide-number', 'show-number');
		}, randomNumFade)

		columnI[i].setAttribute('data', `I${randomNum}`);
	}

	for(let i = 0; i < columnN.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.n.length);
		let randomNum = numbers.n[randomizeNums];
		let randomNumFade = Math.floor(Math.random() * (530 - 200 + 1)) + 200;
		numbers.n.splice(numbers.n.indexOf(numbers.n[randomizeNums]), 1);
		
		setTimeout(() => {
			columnN[i].innerText = `N${randomNum}`;
			columnN[i].classList.replace('hide-number', 'show-number');
		}, randomNumFade)

		columnN[i].setAttribute('data', `N${randomNum}`);
	}

	for(let i = 0; i < columnG.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.g.length);
		let randomNum = numbers.g[randomizeNums];
		let randomNumFade = Math.floor(Math.random() * (530 - 200 + 1)) + 200;
		numbers.g.splice(numbers.g.indexOf(numbers.g[randomizeNums]), 1);
		
		setTimeout(() => {
			columnG[i].innerText = `G${randomNum}`;
			columnG[i].classList.replace('hide-number', 'show-number');
		}, randomNumFade)

		columnG[i].setAttribute('data', `G${randomNum}`);
	}

	for(let i = 0; i < columnO.length; i++){
		let randomizeNums = Math.floor(Math.random() * numbers.o.length);
		let randomNum = numbers.o[randomizeNums];
		let randomNumFade = Math.floor(Math.random() * (530 - 200 + 1)) + 200;
		numbers.o.splice(numbers.o.indexOf(numbers.o[randomizeNums]), 1);
		
		setTimeout(() => {
			columnO[i].innerText = `O${randomNum}`;
			columnO[i].classList.replace('hide-number', 'show-number');
		}, randomNumFade)

		columnO[i].setAttribute('data', `O${randomNum}`);
	}
}

document.querySelector('.new-card').addEventListener('click', generateBoardNums);



const reset = () => {
  for (var i of chosenNums) {
    winningNumbers.push(i);
  }

  chosenNums = []

  squares.forEach(element => {
		element.classList.replace('show-number', 'hide-number');
		element.classList.remove('hit');
    element.setAttribute('data', '')
	})

  document.querySelector('#winning-number').innerText = '';

  console.log(chosenNums)
	console.log(winningNumbers)
}



const pickWinningNum = () => {
	let randomizeWinningNumbers = Math.floor(Math.random() * winningNumbers.length);
	let winningNumber = winningNumbers[randomizeWinningNumbers];
	winningNumbers.splice(winningNumbers.indexOf(winningNumbers[randomizeWinningNumbers]), 1);

  

	bingoCard.addEventListener('click', (evt) => {
		if(evt.target.getAttribute('data') === winningNumber && chosenNums.includes(winningNumber)) {
			evt.target.classList.add('hit');
		}
	})

	document.querySelector('#winning-number').innerText += winningNumber;
	chosenNums.push(winningNumber);

	console.log(chosenNums)
	console.log(winningNumbers)

  // // logic for computer auto dabbing its card
  // squares.forEach(element => {
  //   if(element.getAttribute('data') === winningNumber && chosenNums.includes(winningNumber)){
  //     element.classList.add('hit');
  //   }
  // });
}

document.querySelector('.choose-winning-number').addEventListener('click', pickWinningNum);
document.querySelector('.reset').addEventListener('click', reset);