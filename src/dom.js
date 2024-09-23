import { Player } from "./player.js";

let selectedSquare = [];

const createGrid = (player) => {
	// Create reference to player's gameboard
	const board = player.playerBoard.board;

	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.style.display = "grid";

	// Style grid container
	gridContainer.style.gridTemplateColumns = `repeat(11, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(11, 1fr)`;
	gridContainer.style.width = "500px";
	gridContainer.style.height = "500px";
	gridContainer.classList.add("grid");

	// Array of letters
	const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

	for (let row = 0; row < 11; row++) {
		for (let col = 0; col < 11; col++) {
			// Create square
			const square = document.createElement("div");
			square.classList.add("square");

			// Style Square
			square.style.border = "1px solid #000";
			square.style.display = "flex";
			square.style.justifyContent = "center";
			square.style.alignItems = "center";

			// Add number labels at the top row
			if (row === 0 && col > 0) {
				square.textContent = col; // Numbers along the top
				square.style.fontWeight = "bold";
				square.style.backgroundColor = "#f0f0f0";
			}
			// Add letter labels at the first column
			else if (col === 0 && row > 0) {
				square.textContent = letters[row]; // Letters along the left
				square.style.fontWeight = "bold";
				square.style.backgroundColor = "#f0f0f0";
			}
			// Fill the rest of the grid with game board content
			else if (row > 0 && col > 0) {
				// Determine square content from gameBoard
				if (board[row - 1][col - 1] === null) {
					square.textContent = ""; // Empty cell
				} else {
					square.textContent = "S"; // Ship cell
				}
			}
			gridContainer.appendChild(square);
		}
	}
	document.body.appendChild(gridContainer);
};

const letterToIndex = (letter) => {
	const letters = "ABCDEFGHIJ";
	return letters.indexOf(letter.toUpperCase());
};

const displayHit = (player, letter, columnNum) => {
	let x;
	if (typeof letter === "string") {
		x = letterToIndex(letter);
	} else if (typeof letter === "number") {
		x = letter - 1;
	}
	const y = columnNum - 1;

	const board = player.playerBoard.board;
	const target = board[x][y];
	const index = (x + 1) * 11 + (y + 1);
	const squares = document.getElementsByClassName("square");

	if (target === null) {
		squares[index].style.backgroundColor = "red";
		squares[index].textContent = "X";
	} else {
		squares[index].style.backgroundColor = "blue";
		squares[index].textContent = "O";
	}
};

const createOppGrid = () => {
	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.style.display = "grid";

	// Style grid container
	gridContainer.style.gridTemplateColumns = `repeat(11, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(11, 1fr)`;
	gridContainer.style.width = "500px";
	gridContainer.style.height = "500px";
	gridContainer.classList.add("opp-grid");

	// Array of letters
	const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

	for (let row = 0; row < 11; row++) {
		for (let col = 0; col < 11; col++) {
			// Create square
			const square = document.createElement("div");
			square.classList.add("opp-square");

			// Style Square
			square.style.border = "1px solid #000";
			square.style.display = "flex";
			square.style.justifyContent = "center";
			square.style.alignItems = "center";

			// Add number labels at the top row
			if (row === 0 && col > 0) {
				square.textContent = col; // Numbers along the top
				square.style.fontWeight = "bold";
				square.style.backgroundColor = "#f0f0f0";
			}
			// Add letter labels at the first column
			else if (col === 0 && row > 0) {
				square.textContent = letters[row]; // Letters along the left
				square.style.fontWeight = "bold";
				square.style.backgroundColor = "#f0f0f0";
			}
			// Fill the rest of the grid with null
			else if (row > 0 && col > 0) {
				square.textContent = ""; // Empty cell
			}
			gridContainer.appendChild(square);
		}
	}
	document.body.appendChild(gridContainer);
};

const displaySentHit = (opponentGameboard, letter, columnNum) => {
	let x;
	if (typeof letter === "string") {
		x = letterToIndex(letter) - 1;
	} else if (typeof letter === "number") {
		x = letter - 1;
	}
	const y = columnNum - 1;

	const opponentBoard = opponentGameboard.board;
	const target = opponentBoard[x][y];
	const index = (x + 1) * 11 + (y + 1);
	const squares = document.getElementsByClassName("opp-square");

	// If target is empty square
	if (target === null) {
		squares[index].textContent = "X";
		squares[index].style.backgroundColor = "red";
		squares[index].classList.add("miss");
	} else {
		squares[index].style.backgroundColor = "blue";
		squares[index].textContent = "O";
		squares[index].classList.add("hit");
	}
};

const selectSquare = () => {
	// Get reference to opponent squares
	const oppSquares = document.querySelectorAll(".opp-square");

	//Add event listener to each square
	oppSquares.forEach((square, index) => {
		const x = Math.floor(index / 11);
		const y = index % 11;

		square.addEventListener("click", () => {
			// Clear previous selection
			oppSquares.forEach((square) => square.classList.remove("selected"));
			// Add selected class to square
			square.classList.add("selected");
			selectedSquare = [x, y];
		});
	});
};

const getSelectedSquare = () => {
	return selectedSquare;
};

const sendAttackOnClick = (player, opponentBoard) => {
	const attackBtn = document.getElementById("attack");

	// On attack button click
	attackBtn.addEventListener("click", () => {
		// Store coordinates
		const [x, y] = getSelectedSquare();

		// Check if coordinates exist
		if (x !== null && y !== null) {
			// Get reference to target square on DOM
			const targetSquare = document.querySelector(
				`.opp-square:nth-child(${x * 11 + (y + 1)})`
			);

			console.log("targetSquare", targetSquare);
			// Check if square has 'hit' or 'miss' class
			if (
				targetSquare.classList.contains("hit") ||
				targetSquare.classList.contains("miss")
			) {
				// Alert player and exit from function
				alert(
					"This position has already been attacked! Please select a different one."
				);
				return;
			}
			// Send attack
			player.sendAttack(opponentBoard, x, y);

			// Clear selected grid on html
			document.querySelectorAll(".opp-square").forEach((square) => {
				square.classList.remove("selected");
			});

			//display sent attack
			console.log("sent attack to:", x, y);
			displaySentHit(opponentBoard, x, y);
		}
	});
};

export {
	createGrid,
	displayHit,
	createOppGrid,
	displaySentHit,
	selectSquare,
	sendAttackOnClick,
};
