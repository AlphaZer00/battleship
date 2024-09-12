import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { createGrid } from "./dom.js";

//Temporarily, add boats manually without user input

const player1 = Player("human");

const ship3 = Ship(3);
const ship2 = Ship(2);
player1.playerBoard.placeShip(1, 1, "horizontal", ship3);
player1.playerBoard.placeShip(3, 1, "horizontal", ship2);

createGrid(player1);
