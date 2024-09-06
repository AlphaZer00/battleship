import { Gameboard } from "./gameboard";

const testBoard = Gameboard();

test("Board works", () => {
	expect(testBoard.board).toBeDefined();
});

test("PlaceShip horizontal", () => {
	expect(testBoard.placeShip(4, 10, "vertical", 4)).toBeDefined();
});
console.table(testBoard.board);
