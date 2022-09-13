const tiles = document.querySelectorAll('.square');
// this will count up by 1 each time a tile is iterated over; this is is used to determine which array inside the bingoNumbers object to use when choosing a random number and placing it into a tile
let tileCounter = 0;

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
		// if the tile being iterated over contains a class of either 'header-square' or 'free-spot', skip it and add 1 to tileCounter
		element.classList.contains('header-square') && i++;
		element.classList.contains('free-spot') && i++;

		// get the data-letter attribute from each tile; this will be used for "marking" a tile once a winning number is picked
		let letter = element.getAttribute('data-letter');
		// iterate through the correct array in the bingoNumbers object; bingoNumbers = the object; bingoLetters = use the keys inside the bingoNumbers object; tileCounter = the index of the key inside the object (0 = b, 1 = i, 2 = n, 3 = g, 4 = o)
		let bingoNumbersArray = bingoNumbers[bingoLetters[tileCounter]];
		// randomize the numbers in the correct array in the bingoNumbers object
		let randomizeArrayNumbers = Math.floor(Math.random() * bingoNumbersArray.length);
		// select a random number from the current array in the bingoNumbers object
		let pickNum = bingoNumbersArray[randomizeArrayNumbers];
		// remove the number just selected from the current array so it can't be picked again in the next row
		bingoNumbersArray.splice(bingoNumbersArray.indexOf(bingoNumbersArray[randomizeArrayNumbers]), 1);
		
		// add 1 to the tile counter for every square iterated over (with the exceptions noted)
		tileCounter++
		// once the tile counter hits 5 (the amount of tiles in a row), restart the tile counter; the current tileCounter number is what dictates from which array in the bingoNumbers object to pull a number
		5 === tileCounter && (tileCounter = 0);
		// only place a number into the tile being iterated over if that tile does not contain a class of 'header-square' or 'free-spot', then add a data attribute that consists of the column letter and the tile's number; this will be used for "marking" the tile once a winning number is called
		element.classList.contains('header-square') || element.classList.contains('free-spot') || (element.innerText = pickNum, element.setAttribute('data', letter + pickNum));
	})
}

document.querySelector('.generate-card').addEventListener('click', generateCards);