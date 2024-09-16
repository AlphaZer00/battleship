import { Gameboard } from "./gameboard.js";

const Player = (type) => {
	if (type !== "human" && type !== "computer") {
		throw new Error("Invalid player type");
	}

	const playerBoard = Gameboard();

	const sendAttack = (opponentBoard, letter, y) => {
		//Determine row from letter
		const row = letterToIndex(letter);
		//Determine column by converting to zero-indexed
		const col = y - 1;
		return opponentBoard.receiveAttack(row, col);
	};

	const letterToIndex = (letter) => {
		const letters = "ABCDEFGHIJ";
		return letters.indexOf(letter.toUpperCase());
	};

	return { playerBoard, sendAttack };
};

export { Player };
