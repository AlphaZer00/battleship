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
			endpoint = x - 1 + length;
		} else if (direction === "vertical") {
			endpoint = y - 1 + length;
		}
		return endpoint;
	}

	const placeShip = (x, y, direction, length) => {
		setEndpoint(x, y, direction, length);
	};

	return { placeShip };
};

export { Gameboard };
