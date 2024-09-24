import { Player } from "./player.js";
import { Ship } from "./ship.js";
import {
	createGrid,
	displayHit,
	createOppGrid,
	selectSquare,
	sendAttackOnClick,
} from "./dom.js";

//Temporarily, add boats manually without user input

const player1 = Player("human");
const player2 = Player("computer");

const ship1 = Ship(1);
const ship3 = Ship(3);
const ship2 = Ship(2);
const ship4 = Ship(4);
player1.playerBoard.placeShip(1, 1, "horizontal", ship3);
player1.playerBoard.placeShip(3, 1, "horizontal", ship2);
player2.playerBoard.placeShip(1, 1, "horizontal", ship1);
player2.playerBoard.placeShip(2, 2, "horizontal", ship4);

createGrid(player1);
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
