const Gameboard = () => {
	let endpoint;

	const board = new Array(10);
	for (let i = 0; i < board.length; i++) {
		board[i] = new Array(10);
		for (let j = 0; j < 10; j++) {
			board[i][j] = false;
		}
	}

	function setEndpoint(x, y, direction, length) {
		if (direction === "horizontal") {
			endpoint = y - 1 + length;
		} else if (direction === "vertical") {
			endpoint = x - 1 + length;
		}
		return endpoint;
	}

	function checkBounds() {
		console.log("endpoint", endpoint);
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
		console.table(board);
		return board;
	};

	return { placeShip, board };
};

export { Gameboard };
