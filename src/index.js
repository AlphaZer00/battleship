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
const player2 = Player("human");

const ship1 = Ship(1);
const ship3 = Ship(3);
const ship2 = Ship(2);
player1.playerBoard.placeShip(1, 1, "horizontal", ship3);
player1.playerBoard.placeShip(3, 1, "horizontal", ship2);
player2.playerBoard.placeShip(1, 1, "horizontal", ship1);

createGrid(player1);
createOppGrid(player2);

player2.sendAttack(player1.playerBoard, "A", 1);
player2.sendAttack(player1.playerBoard, "A", 2);
player2.sendAttack(player1.playerBoard, "A", 3);

displayHit(player1, "A", 1);
displayHit(player1, "A", 2);
displayHit(player1, "A", 3);

selectSquare();

// Args vvv (player, opponentBoard)
sendAttackOnClick(player1, player2.playerBoard);

//SEND RANDOM ATTACK
const attackCoords = player2.computerRandomAttack(player1.playerBoard);

if (attackCoords) {
	const [x, y] = attackCoords;
	console.log("randcoords", x, y);
	displayHit(player1, x, y);
}
