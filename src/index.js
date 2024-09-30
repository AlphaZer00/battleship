import { Player } from "./player.js";
import { Ship } from "./ship.js";
import {
	createGrid,
	displayHit,
	createOppGrid,
	selectSquare,
	sendAttackOnClick,
	playerPlaceShips,
	addHoverEffect,
} from "./dom.js";

const player1 = Player("human");
const player2 = Player("computer");

createGrid(player1);

playerPlaceShips(player1);

createOppGrid(player2);
player2.playerBoard.placeComputerShips();


selectSquare();
addHoverEffect();

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
				alert("You Win!");
				return;
			}

			// Next, computer attacks
			computerSendRandomAttack(computer, human);

			// Check if computer wins after attack;
			if (human.playerBoard.isAllSunk()) {
				alert("Computer Wins!");
				return;
			}

			// No winner, continue loop
			playHumanVsComputer(human, computer);
		}
	});
}

playHumanVsComputer(player1, player2);
