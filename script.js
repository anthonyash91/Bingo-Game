const columnB = document.querySelectorAll('.column-b'),
columnI = document.querySelectorAll('.column-i'),
columnN = document.querySelectorAll('.column-n'),
columnG = document.querySelectorAll('.column-g'),
columnO = document.querySelectorAll('.column-o')

const generateBoardNums = () => {
	// column b numbers
	const numbers = {
		b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		i: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
		n: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
		g: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
		o: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
	},
	squares = document.querySelectorAll('.square'),
	squareSpans = document.querySelectorAll('.square span');

	for(let i = 0; i < columnB.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.b.length),
		randomNum = numbers.b[randomizeNums],
		removeRandomNum = numbers.b.indexOf(randomNum);
		numbers.b.splice(removeRandomNum, 1);
		bingoSquare = columnB[i];
		bingoNum = document.createElement('span');
		bingoNum.classList.add('number', 'hide');
		bingoNum.innerText = randomNum;
		bingoSquare.appendChild(bingoNum);
		bingoNum.parentNode.setAttribute('data', `B${randomNum}`);
		setTimeout(() => {
			columnB[i].classList.remove('hide')
		}, 300)
	}

	for(let i = 0; i < columnI.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.i.length),
		randomNum = numbers.i[randomizeNums],
		removeRandomNum = numbers.i.indexOf(randomNum);
		numbers.i.splice(removeRandomNum, 1);
		bingoSquare = columnI[i];
		bingoNum = document.createElement('span');
		bingoNum.classList.add('number', 'hide');
		bingoNum.innerText = randomNum;
		bingoSquare.appendChild(bingoNum);
		bingoNum.parentNode.setAttribute('data', `I${randomNum}`);
		setTimeout(() => {
			columnI[i].classList.remove('hide')
		}, 300)
	}

	for(let i = 0; i < columnN.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.n.length),
		randomNum = numbers.n[randomizeNums],
		removeRandomNum = numbers.n.indexOf(randomNum);
		numbers.n.splice(removeRandomNum, 1);
		bingoSquare = columnN[i];
		bingoNum = document.createElement('span');
		bingoNum.classList.add('number', 'hide');
		bingoNum.innerText = randomNum;
		bingoSquare.appendChild(bingoNum);
		bingoNum.parentNode.setAttribute('data', `N${randomNum}`);
		setTimeout(() => {
			columnN[i].classList.remove('hide')
		}, 300)
	}

	for(let i = 0; i < columnG.length; i++) {
		let randomizeNums = Math.floor(Math.random() * numbers.g.length),
		randomNum = numbers.g[randomizeNums],
		removeRandomNum = numbers.g.indexOf(randomNum);
		numbers.g.splice(removeRandomNum, 1);
		bingoSquare = columnG[i];
		bingoNum = document.createElement('span');
		bingoNum.classList.add('number', 'hide');
		bingoNum.innerText = randomNum;
		bingoSquare.appendChild(bingoNum);
		bingoNum.parentNode.setAttribute('data', `G${randomNum}`);
		setTimeout(() => {
			columnG[i].classList.remove('hide')
		}, 300)
	}

	for(let i = 0; i < columnO.length; i++){
		let randomizeNums = Math.floor(Math.random() * numbers.o.length),
		randomNum = numbers.o[randomizeNums],
		removeRandomNum = numbers.o.indexOf(randomNum);
		numbers.o.splice(removeRandomNum, 1);
		bingoNum = document.createElement('span');
		bingoNum.classList.add('number');
		bingoNum.innerText = randomNum;
		columnO[i].appendChild(bingoNum);
		columnO[i].classList.add('hide')
		columnO[i].setAttribute('data', `O${randomNum}`);
		setTimeout(() => {
			columnO[i].classList.remove('hide')
		}, 300)
	}

	squares.forEach(element => {
		element.classList.add('hide')
	})

	squareSpans.forEach(element => {
		setTimeout(() => {
			element.remove();
		}, 350)
	})
}

document.querySelector('.new-card').addEventListener('click', generateBoardNums);