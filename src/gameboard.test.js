import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

describe("testing placeShip, recieveAttack, and allShipsSunk methods", () => {
    test("standard test of placeShip", () => {
        const gBoard = new Gameboard(5);
        gBoard.placeShip(2,[1,1],"y",gBoard.board);
        expect(gBoard.numOfShips).toEqual(1);
        expect(gBoard.board[1][1]).toEqual({hits:0, length:2});
        expect(gBoard.board[2][1]).toEqual({hits:0, length:2});
    })
    test("placeShip with coords that are outside of board", () => {
        const gBoard2 = new Gameboard(5);
        gBoard2.placeShip(2,[7,7],"x",gBoard2.board);
        expect(gBoard2.numOfShips).toEqual(0);
    })
})