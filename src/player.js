import { Gameboard } from "./gameboard.js";

const Player = (type) => {
	if (type !== "human" && type !== "computer") {
		throw new Error("Invalid player type");
	}

	const playerBoard = Gameboard();

	const sendAttack = (opponentBoard, x, y) => {
		return opponentBoard.receiveAttack(x, y);
	};

	return { playerBoard, sendAttack };
};

export { Player };
