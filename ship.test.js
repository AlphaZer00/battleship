import { Ship } from "./ship";

const testShip = Ship(3);

test("Length works", () => {
	expect(testShip.length).toBe(3);
});
