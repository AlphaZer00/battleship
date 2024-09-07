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
});
