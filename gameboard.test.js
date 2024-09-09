import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("Gameboard Factory Function", () => {
	let testBoard;

	// Before each test, create a new gameboard
	beforeEach(() => {
		testBoard = Gameboard();
	});

	test("initializes a 10x10 board with all values set to null", () => {
		// Check the dimensions of the board
		expect(testBoard.board.length).toBe(10);
		testBoard.board.forEach((row) => {
			expect(row.length).toBe(10);
			// Ensure all values in each row are false
			row.forEach((cell) => {
				expect(cell).toBe(null);
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
				expect(cell).toBe(null);
			});
		});
	});

	describe("Gameboard placeShip Functionality", () => {
		let testBoard;

		beforeEach(() => {
			testBoard = Gameboard();
		});

		test("PlaceShip horizontal", () => {
			const ship = Ship(4); // Ship of length 4
			testBoard.placeShip(6, 6, "horizontal", 4);

			expect(testBoard.board[5][5]).toEqual({ ship, index: 0 }); // First part of the ship
			expect(testBoard.board[5][6]).toEqual({ ship, index: 1 });
			expect(testBoard.board[5][7]).toEqual({ ship, index: 2 });
			expect(testBoard.board[5][8]).toEqual({ ship, index: 3 }); // Last part of the ship

			// Check that other parts of the board are still null
			expect(testBoard.board[5][9]).toBe(null);
			expect(testBoard.board[6][5]).toBe(null);
		});

		test("PlaceShip vertical", () => {
			const ship = Ship(5); // Ship of length 5
			testBoard.placeShip(1, 3, "vertical", 5);

			expect(testBoard.board[0][2]).toEqual({ ship, index: 0 }); // First part of the ship
			expect(testBoard.board[1][2]).toEqual({ ship, index: 1 });
			expect(testBoard.board[2][2]).toEqual({ ship, index: 2 });
			expect(testBoard.board[3][2]).toEqual({ ship, index: 3 });
			expect(testBoard.board[4][2]).toEqual({ ship, index: 4 }); // Last part of the ship

			// Check that other parts of the board are still null
			expect(testBoard.board[5][2]).toBe(null);
			expect(testBoard.board[0][1]).toBe(null);
		});
	});

	describe("receiveAttack works with multiple ships", () => {
		let gameBoard, ship1, ship2;

		beforeEach(() => {
			// Initialize a new Gameboard
			gameBoard = Gameboard();
			ship1 = Ship(3); // Ship of length 3
			ship2 = Ship(2); // Ship of length 2

			// Place two ships on the board
			gameBoard.placeShip(1, 1, "horizontal", 3); // Ship 1 placed at (1,1) to (1,3)
			gameBoard.placeShip(3, 1, "vertical", 2); // Ship 2 placed at (3,1) to (4,1)
		});

		test("receiveAttack hits the correct ship", () => {
			gameBoard.receiveAttack(1, 1); // Hits ship1 at (1,1)
			expect(ship1.isSunk()).toBe(false); // Ship1 is not yet sunk

			gameBoard.receiveAttack(1, 2); // Hits ship1 at (1,2)
			gameBoard.receiveAttack(1, 3); // Hits ship1 at (1,3)
			expect(ship1.isSunk()).toBe(true); // Ship1 should be sunk after 3 hits
		});

		test("receiveAttack misses properly", () => {
			gameboard.receiveAttack(2, 2); // No ship at (2,2)
			expect(gameboard.missedShots).toContainEqual([2, 2]); // Miss should be recorded
		});

		test("receiveAttack hits different ships correctly", () => {
			gameboard.receiveAttack(3, 1); // Hits ship2 at (3,1)
			expect(ship2.isSunk()).toBe(false); // Ship2 is not yet sunk

			gameboard.receiveAttack(4, 1); // Hits ship2 at (4,1)
			expect(ship2.isSunk()).toBe(true); // Ship2 should be sunk after 2 hits
		});
	});
});
