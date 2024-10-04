import { Ship } from "./ship.js";

let selectedSquare = [];

const createGrid = (player) => {
	// Create reference to DOM board container & clear previous
	const boardContainer = document.querySelector(".board-container");
	boardContainer.innerHTML = "";
	// Create reference to player's gameboard
	const board = player.playerBoard.board;

	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.style.display = "grid";

	// Style grid container
	gridContainer.style.gridTemplateColumns = `repeat(11, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(11, 1fr)`;
	gridContainer.style.width = "400px";
	gridContainer.style.height = "400px";
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
					square.classList.add("ship");
					square.style.backgroundColor = "gray"; // Ship cell
				}
			}
			gridContainer.appendChild(square);
		}
	}
	boardContainer.appendChild(gridContainer);
};

const letterToIndex = (letter) => {
	const letters = "ABCDEFGHIJ";
	return letters.indexOf(letter.toUpperCase());
};

const displayHit = (player, letter, columnNum) => {
	let x;
	if (typeof letter === "string") {
		x = letterToIndex(letter) - 1;
	} else if (typeof letter === "number") {
		x = letter - 1;
	}
	const y = columnNum - 1;

	const board = player.playerBoard.board;
	const target = board[x][y];
	const index = (x + 1) * 11 + (y + 1);
	const squares = document.getElementsByClassName("square");

	if (target === null) {
		squares[index].classList.add("miss");
	} else {
		squares[index].classList.add("hit");
		squares[index].style.backgroundColor = "rgb(83, 214, 66);";
	}
};

const createOppGrid = () => {
	// Get reference to board container
	const oppBoard = document.querySelector(".opp-board-container");
	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.style.display = "grid";

	// Style grid container
	gridContainer.style.gridTemplateColumns = `repeat(11, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(11, 1fr)`;
	gridContainer.style.width = "400px";
	gridContainer.style.height = "400px";
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
				square.classList.add("border");
			}
			// Add letter labels at the first column
			else if (col === 0 && row > 0) {
				square.textContent = letters[row]; // Letters along the left
				square.style.fontWeight = "bold";
				square.style.backgroundColor = "#f0f0f0";
				square.classList.add("border");
			}
			// Fill the rest of the grid with null
			else if (row > 0 && col > 0) {
				square.textContent = ""; // Empty cell
			}
			gridContainer.appendChild(square);
		}
	}
	oppBoard.appendChild(gridContainer);
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
		squares[index].classList.add("miss");
	} else {
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

const sendAttackOnClick = (player, opponentBoard, callback) => {
	const squares = document.querySelectorAll(".opp-square:not(.hit, .miss)");
	for (let el of squares) {
		if (!el.classList.contains("hit") && !el.classList.contains("miss")) {
			el.addEventListener("click", () => {
				// Store coordinates
				const [x, y] = getSelectedSquare();

				// Check if coordinates exist
				if (x !== null && y !== null) {
					// Get reference to target square on DOM
					const targetSquare = document.querySelector(
						`.opp-square:nth-child(${x * 11 + (y + 1)})`
					);

					// Check if square has 'hit', 'miss', or 'border' class
					if (
						targetSquare.classList.contains("hit") ||
						targetSquare.classList.contains("miss") ||
						targetSquare.classList.contains("border")
					) {
						callback(false); // Return false callback for player turn logic
						return;
					}
					// Send attack
					player.sendAttack(opponentBoard, x, y);

					// Clear selected grid on html
					document
						.querySelectorAll(".opp-square")
						.forEach((square) => {
							square.classList.remove("selected");
						});

					//display sent attack
					displaySentHit(opponentBoard, x, y);

					// Send successful attack callback
					callback(true);
				}
			});
		}
	}
};

function playerPlaceShips(player) {
	// Get dom references
	const form = document.getElementById("place-ship-form");
	const prompt = form.querySelector(".prompt");
	const placeBtn = document.getElementById("place");
	const randomBtn = document.getElementById("randomPlace");


	// Create a new confirm button dynamically
	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Confirm Placement";
	confirmBtn.style.display = "none"; // Hide initially
	form.appendChild(confirmBtn); // Append the confirm button to the form

	// Array of ship lengths
	const shipLengths = [5, 4, 3, 3, 2];
	let currentShipIndex = 0;

	// Function to update prompt
	function updatePrompt() {
		prompt.textContent = `Place Ship #${currentShipIndex + 1} (length: ${
			shipLengths[currentShipIndex]
		})`;
	}

	// Function to display preview of ship placement
	function previewShip(x, y, orientation, shipLength) {
		//Get reference to grid squares
		const squares = document.getElementsByClassName("square");

		// Preview for horizontal placement
		if (orientation === "horizontal" && y + shipLength < 12) {
			for (let i = 0; i < shipLength; i++) {
				const index = x * 11 + (y + i);
				// Check if player is attempting to overlap ship placements
				if (squares[index].classList.contains("ship")) {
					prompt.textContent =
						"ERROR: Ships cannot overlap, try a different placement!";
					return false;
				}
				if (squares[index]) {
					squares[index].classList.add("preview");
				}
			}
			return true;
		} else if (orientation === "vertical" && x + shipLength < 12) {
			for (let i = 0; i < shipLength; i++) {
				const index = (x + i) * 11 + y;
				// Check if player is attempting to overlap ship placements
				if (squares[index].classList.contains("ship")) {
					prompt.textContent =
						"ERROR: Ships cannot overlap, try a different placement!";
					return false;
				}
				if (squares[index]) {
					squares[index].classList.add("preview");
				}
			}
			return true;
		} else {
			prompt.textContent =
				"ERROR: Ship is not in bounds, try a different placement!";
			return false;
		}
	}

	// Function to clear preview squares
	function clearPreview() {
		const squares = document.getElementsByClassName("square");

		for (let el of squares) {
			el.classList.remove("preview");
		}
	}

	// Function to handle placing preview of ships
	function handlePlaceShip(event) {
		event.preventDefault();

		// Remove any previously previewed ships
		clearPreview();

		// Store user inputs
		const xCoord =
			letterToIndex(document.getElementById("x-coord").value) + 1;
		const yCoord = parseInt(document.getElementById("y-coord").value, 10);
		const orientation = document.getElementById("orientation").value;

		//Create new Ship
		let shipLength = shipLengths[currentShipIndex];

		// Preview the placement
		if (previewShip(xCoord, yCoord, orientation, shipLength)) {
			prompt.textContent = "Confirm placement of ship";
			confirmBtn.style.display = "inline";
		}
	}

	// Function to handle confirming placement of ship
	function handleConfirmPlacement(event) {
		event.preventDefault();

		// Store user inputs
		const xCoord = letterToIndex(document.getElementById("x-coord").value);
		const yCoord =
			parseInt(document.getElementById("y-coord").value, 10) - 1;
		const orientation = document.getElementById("orientation").value;

		// Get the current ship length and create the ship
		const shipLength = shipLengths[currentShipIndex];
		const newShip = Ship(shipLength);

		// Clear the previous preview
		clearPreview(xCoord, yCoord, orientation, shipLength);

		// Place the ship on the board
		const success = player.playerBoard.placeShip(
			xCoord + 1,
			yCoord + 1,
			orientation,
			newShip
		);

		if (success) {
			currentShipIndex++;
			createGrid(player);

			if (currentShipIndex < shipLengths.length) {
				updatePrompt(); // Show prompt for the next ship
				placeBtn.style.display = "inline"; // Show place button again for next ship
				confirmBtn.style.display = "none"; // Hide confirm button again
			} else {
				prompt.textContent = "All Ships Placed!";
				form.style.display = "none";
			}
		} else {
			alert("Invalid placement, try different coordinates.");
			placeBtn.style.display = "inline"; // Show place button again to retry
			confirmBtn.style.display = "none"; // Hide confirm button
			updatePrompt(); // Reset prompt to ask for placement
		}
	}

	function handleRandomPlaceBtn(event) {
		event.preventDefault();

		player.playerBoard.placeShipsRandom();
		form.style.display = "none";
		createGrid(player);
	}

	// Set initial prompt
	updatePrompt();
	placeBtn.addEventListener("click", handlePlaceShip);
	confirmBtn.addEventListener("click", handleConfirmPlacement);
	randomBtn.addEventListener("click", handleRandomPlaceBtn);
}

const addHoverEffect = () => {
	const squares = document.querySelectorAll(".opp-square:not(.hit, .miss)");
	for (let el of squares) {
		el.addEventListener("mouseover", () => {
			if (
				!el.classList.contains("hit") &&
				!el.classList.contains("miss")
			) {
				el.classList.add("hover");
			}
		});

		el.addEventListener("mouseout", () => {
			el.classList.remove("hover");
		});
	}
};

export {
	createGrid,
	displayHit,
	createOppGrid,
	displaySentHit,
	selectSquare,
	sendAttackOnClick,
	playerPlaceShips,
	addHoverEffect,
};
