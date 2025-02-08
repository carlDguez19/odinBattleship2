import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

const gBoard5 = new Gameboard(5);
gBoard5.placeShip(2,[1,1],"x", gBoard5.board);
gBoard5.receiveAttack([1,1], gBoard5.board);
const testShip = gBoard5.board[1][1];
console.log(testShip);