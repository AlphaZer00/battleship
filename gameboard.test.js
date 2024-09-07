import { Gameboard } from "./gameboard";

describe("Gameboard Factory Function", () => {
	let testBoard;

	// Before each test, create a new gameboard
	beforeEach(() => {
		testBoard = Gameboard();
	});

	test("initializes a 10x10 board with all values set to false", () => {
		// Check the dimensions of the board
		expect(testBoard.board.length).toBe(10);
		testBoard.board.forEach((row) => {
			expect(row.length).toBe(10);
			// Ensure all values in each row are false
			row.forEach((cell) => {
				expect(cell).toBe(false);
			});
		});
	});

	test("clearBoard resets all values to false", () => {
		// Modify a value in the board to simulate a placed ship
		testBoard.board[0][0] = true;
		testBoard.board[9][9] = true;

		// Call the clearBoard method
		testBoard.clearBoard();

		// Ensure the board is reset
		testBoard.board.forEach((row) => {
			row.forEach((cell) => {
				expect(cell).toBe(false);
			});
		});
	});

	test("PlaceShip horizontal", () => {
		expect(testBoard.placeShip(6, 6, "horizontal", 4)).toEqual([
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[false, false, false, false, false, true, true, true, true, false],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
		]);
	});

	test("PlaceShip vertical", () => {
		expect(testBoard.placeShip(1, 3, "vertical", 5)).toEqual([
			[
				false,
				false,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
		]);
	});

	describe("Gameboard receiveAttack Functionality", () => {
		let gameBoard;

		beforeEach(() => {
			// Initialize a new Gameboard
			gameBoard = Gameboard();
			// Place a ship at position (1, 1) to (1, 3) horizontally
			gameBoard.placeShip(1, 1, "horizontal", 3);
		});

		test("receiveAttack registers a hit when coordinates match a ship", () => {
			// Attack where a ship is placed
			gameBoard.receiveAttack(1, 1);
			expect(gameBoard.board[0][0]).toBe("hit"); // A hit should be registered

			gameBoard.receiveAttack(1, 2);
			expect(gameBoard.board[0][1]).toBe("hit"); // Another hit should be registered

			gameBoard.receiveAttack(1, 3);
			expect(gameBoard.board[0][2]).toBe("hit"); // A third hit should be registered
		});

		test("receiveAttack registers a miss when no ship is at the coordinates", () => {
			// Attack where no ship is placed
			gameBoard.receiveAttack(2, 1);
			expect(gameBoard.missedShots).toContainEqual([2, 1]); // Coordinates should be recorded as a miss
		});

		test("receiveAttack does not mark coordinates as a miss if a hit was made", () => {
			gameBoard.receiveAttack(1, 1); // A ship exists at (1,1)
			expect(gameBoard.missedShots).not.toContainEqual([1, 1]); // It should not be marked as a miss
		});

		test("multiple missed shots are recorded correctly", () => {
			gameBoard.receiveAttack(2, 1); // Miss
			gameBoard.receiveAttack(3, 2); // Miss
			gameBoard.receiveAttack(4, 5); // Miss
			expect(gameBoard.missedShots).toEqual([
				[2, 1],
				[3, 2],
				[4, 5],
			]); // All missed shots should be recorded
		});
	});
});
