import { Player } from "./player.js";
import { Ship } from "./ship.js";
import {
	createGrid,
	displayHit,
	createOppGrid,
	displaySentHit,
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

// Args vvv (player, opponentBoard)
sendAttackOnClick(player1, player2.playerBoard);

//SEND RANDOM ATTACK
function computerSendRandomAttack(computer, human) {
	const attackCoords = computer.computerRandomAttack(human.playerBoard);
	if (attackCoords) {
		const [x, y] = attackCoords;
		displayHit(human, x, y);
	}
}
