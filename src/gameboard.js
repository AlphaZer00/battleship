import { Ship } from "./ship.js";

const Gameboard = () => {
	let endpoint;
	const missedShots = [];
	const ships = [];

	const board = new Array(10);
	for (let i = 0; i < board.length; i++) {
		board[i] = new Array(10);
		for (let j = 0; j < 10; j++) {
			board[i][j] = null;
		}
	}

	const clearBoard = () => {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				board[i][j] = null;
			}
		}
	};

	function setEndpoint(x, y, direction, length) {
		if (direction === "horizontal") {
			endpoint = y - 1 + length;
		} else if (direction === "vertical") {
			endpoint = x - 1 + length;
		}
		return endpoint;
	}

	function checkBounds() {
		if (endpoint < 11) {
			return true;
		}
		return false;
	}

	const placeShip = (x, y, direction, ship) => {
		setEndpoint(x, y, direction, ship.length);
		if (!checkBounds()) {
			throw new Error("Ship is not in bounds");
		}

		if (direction === "horizontal") {
			for (let i = 0; i < ship.length; i++) {
				if (!(board[x - 1][y - 1 + i] === null)) {
					throw new Error("Ships cannot overlap");
				} else {
					board[x - 1][y - 1 + i] = { ship, index: i };
					ships.push(ship);
				}
			}
		} else if (direction === "vertical") {
			for (let i = 0; i < ship.length; i++) {
				if (!(board[x - 1 + i][y - 1] === null)) {
					throw new Error("Ships cannot overlap");
				} else {
					board[x - 1 + i][y - 1] = { ship, index: i };
					ships.push(ship);
				}
			}
		}

		return board;
	};

	const receiveAttack = (x, y) => {
		// Create variable for target
		const target = board[x][y];
		// Check if ship is at target
		if (target && target.ship) {
			// Mark as hit
			target.ship.hit(target.index);
		} else {
			// record missed hit
			missedShots.push([x, y]);
		}
	};

	const isAllSunk = () => {
		return ships.every((ship) => ship.isSunk());
	};

	const placeComputerShips = () => {
		const shipLengths = [5, 4, 3, 3, 2];

		// Function to generate random coordinates and orientation
		const getRandomPlacement = () => {
			const x = Math.floor(Math.random() * 10) + 1;
			const y = Math.floor(Math.random() * 10) + 1;
			const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
			return { x, y, orientation };
		};

		// Function to determine if placement is valid
		const validatePlacement = (x, y, orientation, length) => {
			if (orientation === "horizontal") {
				// Check if out of bounds
				if (y - 1 + length > 10) return false;
				for (let i = 0; i < length; i++) {
					// Check if overlapping with another ship
					if (board[x - 1][y - 1 + i] !== null) {
						return false;
					}
				}
			} else if (orientation === "vertical") {
				// Check if out of bounds
				if (x - 1 + length > 10) return false;
				for (let i = 0; i < length; i++) {
					// Check if overlapping with another ship
					if (board[x - 1 + i][y - 1] !== null) {
						return false;
					}
				}
			}
			return true;
		};

		// Loop through array of ship lengths
		shipLengths.forEach((length) => {
			let placed = false;
			while (!placed) {
				const { x, y, orientation } = getRandomPlacement(); // Get random placement
				// If placement is valid
				if (validatePlacement(x, y, orientation, length)) {
					const newShip = Ship(length); // Create Ship object
					placeShip(x, y, orientation, newShip); // Place the ship
					placed = true; // Set placed to true so that while loop ends for this element of shipLengths
				}
			}
		});
	};

	return {
		placeShip,
		board,
		clearBoard,
		receiveAttack,
		missedShots,
		isAllSunk,
		placeComputerShips,
	};
};

export { Gameboard };
