import { Gameboard } from "./gameboard";

const testBoard = Gameboard();

test("Board works", () => {
	expect(testBoard.board).toBeDefined();
});

test("PlaceShip horizontal", () => {
	expect(testBoard.placeShip(6, 6, "horizontal", 4)).toEqual([[false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, true, true, true, true, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false]]);
});

console.table(testBoard.board);
