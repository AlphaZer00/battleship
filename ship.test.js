import { Ship } from "./ship";

const testShip = Ship(2);
testShip.resetHits();

describe("Ship Factory Functionality", () => {
	let testShip;

	// Before each test, create a new ship with length 2 and reset hits
	beforeEach(() => {
		testShip = Ship(2);
		testShip.resetHits();
	});

	test("Length works", () => {
		expect(testShip.length).toBe(2);
	});

	test("isSunk before hits", () => {
		expect(testShip.isSunk()).toBe(false);
	});

	describe("isSunkAfter hits", () => {
		beforeEach(() => {
			testShip.hit();
			testShip.hit();
		});

		test("isSunk after hits", () => {
			expect(testShip.isSunk()).toBe(true);
		});
	});
});
