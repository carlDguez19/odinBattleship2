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

// const gBoard5 = new Gameboard(5);
// gBoard5.placeShip(2,[1,1],"x", gBoard5.board);
// gBoard5.receiveAttack([1,1], gBoard5.board);
// const testShip = gBoard5.board[1][1];
// console.log(testShip);

const player1 = new Player("real", 5);
const player2 = new Player("real", 5);

player1.pBoard.placeShip(3,[2,2],"y");
player1.pBoard.placeShip(2,[0,1],"x");
player1.pBoard.placeShip(2,[2,0],"x");

player2.pBoard.placeShip(3,[1,2],"x");
player2.pBoard.placeShip(2,[2,1],"y");
player2.pBoard.placeShip(2,[3,3],"y");

player1.openBoard(".p1Grid");
player2.openBoard(".p2Grid");