const columnB = document.querySelectorAll('.column-b'),
columnI = document.querySelectorAll('.column-i'),
columnN = document.querySelectorAll('.column-n'),
columnG = document.querySelectorAll('.column-g'),
columnO = document.querySelectorAll('.column-o')

const generateBoardNums = () => {
	// column b numbers
	const numbers = {b: [], i: [], n: [], g: [], o: []},
	squares = document.querySelectorAll('.square');

	squares.forEach(element => {
		element.classList.replace('show-number', 'hide-number');
	})

	// create the array with the numbers that will be randomly picked and assigned to spots in the B column
	for(let i = 1; i <= 15; i++) numbers.b.push(i);
	// create the array with the numbers that will be randomly picked and assigned to spots in the I column
	for(let i = 16; i <= 30; i++) numbers.i.push(i);
	// create the array with the numbers that will be randomly picked and assigned to spots in the N column
	for(let i = 31; i <= 45; i++) numbers.n.push(i);
	// create the array with the numbers that will be randomly picked and assigned to spots in the G column
	for(let i = 46; i <= 60; i++) numbers.g.push(i);
	// create the array with the numbers that will be randomly picked and assigned to spots in the O column
	for(let i = 61; i <= 75; i++) numbers.o.push(i);

	for(let i = 0; i < columnB.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.b.length);
		// pick a random number from the b array
		let randomNum = numbers.b[randomizeNums];
		let randomNumFade = Math.floor(Math.random() * (100 - 530 + 1)) + 530;
		// remove the random number just picked from the b array so it can't be picked again when the loop iterates; this ensures there are no repeating numbers in the column
		numbers.b.splice(numbers.b.indexOf(numbers.b[randomizeNums]), 1);

		setTimeout(() => {
			columnB[i].innerText = randomNum;
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
			columnI[i].innerText = randomNum;
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
			columnN[i].innerText = randomNum;
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
			columnG[i].innerText = randomNum;
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
			columnO[i].innerText = randomNum;
			columnO[i].classList.replace('hide-number', 'show-number');
		}, randomNumFade)

		columnO[i].setAttribute('data', `O${randomNum}`);
	}
}

document.querySelector('.new-card').addEventListener('click', generateBoardNums);