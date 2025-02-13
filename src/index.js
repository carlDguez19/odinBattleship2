import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

// const gBoard5 = new Gameboard(5);
// gBoard5.placeShip(2,[1,1],"x", gBoard5.board);
// gBoard5.receiveAttack([1,1], gBoard5.board);
// const testShip = gBoard5.board[1][1];
// console.log(testShip);

const player1 = new Player("real", 5);
const player2 = new Player("real", 5);

player1.chooseLocation(3,[2,2],"y");
player1.chooseLocation(2,[0,1],"x");
player1.chooseLocation(2,[2,0],"x");

player2.chooseLocation(3,[1,2],"x");
player2.chooseLocation(2,[2,1],"y");
player2.chooseLocation(2,[3,3],"y");
