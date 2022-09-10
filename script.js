const columnB = document.querySelectorAll('.column-b'),
columnI = document.querySelectorAll('.column-i'),
columnN = document.querySelectorAll('.column-n'),
columnG = document.querySelectorAll('.column-g'),
columnO = document.querySelectorAll('.column-o'),
newCard = document.querySelector('button')

const generateCard = () => {
	for (let i = 0; i < columnB.length; i++) {
		let randomNum = Math.floor(Math.random() * (15 - 1 + 1)) + 1,
		square = columnB[i];
		square.innerText = randomNum;
	}

	for (let i = 0; i < columnI.length; i++) {
		let randomNum = Math.floor(Math.random() * (30 - 16 + 1)) + 16,
		square = columnI[i];
		square.innerText = randomNum;
	}

	for (let i = 0; i < columnN.length; i++) {
		let randomNum = Math.floor(Math.random() * (45 - 31 + 1)) + 31,
		square = columnN[i];
		square.innerText = randomNum;
	}

	for (let i = 0; i < columnG.length; i++) {
		let randomNum = Math.floor(Math.random() * (60 - 46 + 1)) + 46,
		square = columnG[i];
		square.innerText = randomNum;
	}

	for (let i = 0; i < columnO.length; i++) {
		let randomNum = Math.floor(Math.random() * (75 - 61 + 1)) + 61,
		square = columnO[i];
		square.innerText = randomNum;
	}
}

newCard.addEventListener('click', generateCard);