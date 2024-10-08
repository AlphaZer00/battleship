import { Ship } from "./ship.js";

const testShip = Ship(2);
testShip.resetHits();

describe("Ship Factory Functionality", () => {
	let testShip;

	// Before each test, create a new ship with length 2 and reset hits
	beforeEach(() => {
		testShip = Ship(2);
		testShip.resetHits();
	});

	describe("Initialization", () => {
		test("creates a ship with the correct length", () => {
			expect(testShip.length).toBe(2);
		});
	});

	describe("Hit Functionality", () => {
		test("increases timesHit when hit is called", () => {
			testShip.hit(0);
			testShip.hit(1);
			expect(testShip.isSunk()).toBe(true); // After 2 hits, the ship should be sunk
		});

		test("does not sink the ship with fewer hits than length", () => {
			testShip.hit();
			expect(testShip.isSunk()).toBe(false); // After 1 hit, the ship should not be sunk
		});
	});

	describe("Reset Functionality", () => {
		test("resetHits should reset the number of hits", () => {
			testShip.hit(0);
			testShip.hit(1);
			expect(testShip.isSunk()).toBe(true); // Ship should be sunk after 2 hits

			testShip.resetHits(); // Reset hits
			expect(testShip.isSunk()).toBe(false); // After reset, ship should not be sunk
		});
	});
});
