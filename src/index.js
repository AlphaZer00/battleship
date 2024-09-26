import { Player } from "./player.js";
import { Ship } from "./ship.js";
import {
	createGrid,
	displayHit,
	createOppGrid,
	selectSquare,
	sendAttackOnClick,
    playerPlaceShips,
} from "./dom.js";

const player1 = Player("human");
const player2 = Player("computer");

playerPlaceShips(player1);

createOppGrid(player2);

selectSquare();

// SEND RANDOM ATTACK
function computerSendRandomAttack(computer, human) {
	const attackCoords = computer.computerRandomAttack(human.playerBoard);
	if (attackCoords) {
		const [x, y] = attackCoords;
		displayHit(human, x, y);
	}
}

function playHumanVsComputer(human, computer) {
	// First, human attack
	sendAttackOnClick(human, computer.playerBoard, (attackSuccess) => {
		if (attackSuccess) {
			if (computer.playerBoard.isAllSunk()) {
				alert("Human Wins!");
				return;
			}

			// Next, computer attacks
			computerSendRandomAttack(computer, human);

			// Check if computer wins after attack;
			if (human.playerBoard.isAllSunk()) {
				alert("Computer wins!");
				return;
			}

			// No winner, continue loop
			playHumanVsComputer(human, computer);
		}
	});
}

playHumanVsComputer(player1, player2);
