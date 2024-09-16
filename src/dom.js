import { Player } from "./player.js";

const renderBoard = (player) => {
	// Create reference to board
	const board = player.playerBoard.board;

	const grid = document.createElement("div");
};

const createGrid = (player) => {
	// Create reference to player's gameboard
	const board = player.playerBoard.board;

	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.style.display = "grid";

	// Style grid container
	gridContainer.style.gridTemplateColumns = `repeat(10, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(10, 1fr)`;
	gridContainer.style.gap = "5px";
	gridContainer.style.width = "500px";
	gridContainer.style.height = "500px";
	gridContainer.classList.add("grid");

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			// Create square
			const square = document.createElement("div");
			square.classList.add("square");

			// Style Square
			square.style.border = "1px solid #000";
			square.style.display = "flex";
			square.style.justifyContent = "center";
			square.style.alignItems = "center";

			// Determine square content from gameBoard
			if (board[row][col] === null) {
				square.textContent = "null";
			} else {
				square.textContent = "S";
			}
			gridContainer.appendChild(square);
		}
	}
	document.body.appendChild(gridContainer);
};

const displayHit = (player, x, y) => {
	const board = player.playerBoard.board;
	const target = board[x - 1][y - 1];
	const index = (x - 1) * 10 + (y - 1);
	const squares = document.getElementsByClassName("square");

	if (target === null) {
		squares[index].style.backgroundColor = "red";
		squares[index].textContent = "X";
	} else {
		squares[index].style.backgroundColor = "blue";
		squares[index].textContent = "O";
	}
};

export { createGrid, displayHit };
