import { Gameboard } from "./gameboard.js";

const Player = (type) => {
	if (type !== "human" && type !== "computer") {
		throw new Error("Invalid player type");
	}

	const playerBoard = Gameboard();

	const sendAttack = (opponentBoard, letter, y) => {
		//Determine row from letter
		let row;
		if (typeof letter === "string") {
			row = letterToIndex(letter) - 1;
		} else if (typeof letter === "number") {
			row = letter - 1;
		}
		//Determine column by converting to zero-indexed
		const col = y - 1;
		// Validate row and column
		if (row === -1 || col < 0 || col > 9) {
			throw new Error("Invalid coordinates");
		}
		return opponentBoard.receiveAttack(row, col);
	};

	const letterToIndex = (letter) => {
		const letters = "ABCDEFGHIJ";
		return letters.indexOf(letter.toUpperCase());
	};

    let validCoords = [];

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            validCoords.push([x, y]);
        }
    }

	const computerRandomAttack = (opponentGameboard) => {
		const getRandomCoords = () => {
			if (validCoords.length === 0) {
				console.log("No valid coordinates remaining");
				return null;
			}

			const randomIndex = Math.floor(Math.random() * validCoords.length);
			const [x, y] = validCoords[randomIndex];

			validCoords.splice(randomIndex, 1);

			return [x, y];
		};

		const sendAttackToGameboard = () => {
			let coords = getRandomCoords();
			while (coords !== null) {
                let [x, y] = coords;
				const attackSuccess = opponentGameboard.receiveAttack(x, y);
				if (attackSuccess) {
					return [x, y];
				} else {
					return sendAttackToGameboard();
				}
			}
            return null;
		};

		return sendAttackToGameboard();
	};

	return { playerBoard, sendAttack, computerRandomAttack };
};

export { Player };
