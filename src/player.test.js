import { Ship } from "./src/ship";
import { Player } from "./player";
import { describe } from "node:test";

describe("Player factory function", () => {
	let player1 = Player("human");
	let player2 = Player("computer");

	test("References gameboard factory properly", () => {
		expect(player1.playerBoard.board.length).toBe(10);
	});

	describe("Send attack functionality", () => {
		test("Opponent ship is not yet sunk", () => {
			let newShip = Ship(2); // New Ship object
			expect(newShip.isSunk()).toEqual(false); // The ship should not be sunk initially
		});

		test("Opponent ship is sunk after attacks", () => {
			let newShip = Ship(2); // New Ship object
			player2.playerBoard.placeShip(1, 1, "horizontal", newShip);
			player1.sendAttack(player2.playerBoard, 1, 1); // First hit
			player1.sendAttack(player2.playerBoard, 1, 2); // Second hit
			expect(newShip.isSunk()).toEqual(true); // After 2 hits, the ship should be sunk
		});
	});
});
