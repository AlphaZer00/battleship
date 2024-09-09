import { Ship } from "./ship";

const Gameboard = () => {
	let endpoint;
	const missedShots = [];

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

	const placeShip = (x, y, direction, length) => {
		const newShip = Ship(length);

		setEndpoint(x, y, direction, length);
		if (!checkBounds()) {
			throw new Error("Ship is not in bounds");
		}

		if (direction === "horizontal") {
			for (let i = 0; i < length; i++) {
				board[x - 1][y - 1 + i] = { ship: newShip, index: i };
			}
		} else if (direction === "vertical") {
			for (let i = 0; i < length; i++) {
				board[x - 1 + i][y - 1] = { ship: newShip, index: i };
			}
		}

		return board;
	};

	const receiveAttack = (x, y) => {
		// Create variable for target
		const target = board[x - 1][y - 1];
		// Check if ship is at target
		if (target && target.ship) {
			// Mark as hit
			target.ship.hit(target.index);
		} else {
			// record missed hit
			missedShots.push([x, y]);
		}
	};

	return { placeShip, board, clearBoard, receiveAttack, missedShots };
};

export { Gameboard };
