import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

//here we will have the flow of the game...
//game setup
//ask how many ships per board
//ask if player is real or computer.
//if real then prompt player for coords of ships and place them
//else generate random coords for ships and place them(all of this in a method in gameboard???)
//start gameloop
//each player takes turn choosing a coord until either of the players allShipsSunk

const player1 = new Player("real", 10);
const player2 = new Player("real", 10);

player1.pBoard.placeShip(3,[2,3],1);
player1.pBoard.placeShip(2,[0,1],0);
player1.pBoard.placeShip(2,[2,0],0);
player1.pBoard.placeShip(4,[9,6],0);
player1.pBoard.placeShip(5,[3,8],1);

player2.pBoard.placeShip(3,[1,2],0);
player2.pBoard.placeShip(2,[2,1],1);
player2.pBoard.placeShip(2,[3,3],1);
player2.pBoard.placeShip(4,[9,3],0);
player2.pBoard.placeShip(5,[3,5],1);

player1.openBoard(".player1Board");
player2.openBoard(".player2Board");
player1.openBoard(".player1HiddenBoard");
player2.openBoard(".player2HiddenBoard");

player1.displayShips(".player1Board");
player2.displayShips(".player2Board");

// player1.clickCell(".player1Board");
// player2.clickCell(".player2Board");
player1.clickCell(".player1HiddenBoard", ".player1Board");
player2.clickCell(".player2HiddenBoard", ".player2Board");