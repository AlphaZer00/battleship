const Gameboard = () => {
	let endpoint;
	const missedShots = [];

	const board = new Array(10);
	for (let i = 0; i < board.length; i++) {
		board[i] = new Array(10);
		for (let j = 0; j < 10; j++) {
			board[i][j] = false;
		}
	}

	const clearBoard = () => {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				board[i][j] = false;
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
		setEndpoint(x, y, direction, length);
		if (!checkBounds()) {
			throw new Error("Ship is not in bounds");
		}

		if (direction === "horizontal") {
			for (let i = 0; i < length; i++) {
				board[x - 1][y - 1 + i] = true;
			}
		} else if (direction === "vertical") {
			for (let i = 0; i < length; i++) {
				board[x - 1 + i][y - 1] = true;
			}
		}

		return board;
	};

	const receiveAttack = (x, y) => {
		// Check if ship is at coordinates
		if (board[x - 1][y - 1]) {
			// Mark as hit
			board[x - 1][y - 1] = "hit";
		} else {
			// record missed hit
			missedShots.push([x, y]);
		}
	};

	return { placeShip, board, clearBoard, receiveAttack, missedShots };
};

export { Gameboard };
