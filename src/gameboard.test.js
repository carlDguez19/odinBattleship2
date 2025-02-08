import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

describe("testing placeShip and all its variations", () => {//testing placeShip, recieveAttack, and allShipsSunk methods
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
    test("placeShip that is bigger than board", () => {
        const gBoard3 = new Gameboard(5);
        gBoard3.placeShip(7,[0,0],"y",gBoard3.board);
        expect(gBoard3.numOfShips).toEqual(0);
    })
    test("placeShip on top of another ship", () => {
        const gBoard4 = new Gameboard(5);
        gBoard4.placeShip(2,[1,1],"y",gBoard4.board);
        gBoard4.placeShip(3,[1,1],"x",gBoard4.board);
        expect(gBoard4.numOfShips).toEqual(1);
        expect(gBoard4.board[1][1]).toEqual({hits:0, length:2});
        expect(gBoard4.board[2][1]).toEqual({hits:0, length:2});
    })
})
describe("testing recieveAttack whether it registers misses and hits", () => {
    test("testing a hit on a ship", () => {
        const gBoard5 = new Gameboard(5);
        gBoard5.placeShip(2,[1,1],"x", gBoard5.board);
        gBoard5.receiveAttack([1,1], gBoard5.board);
        const testShip = gBoard5.board[1][1];
        expect(testShip.hits).toEqual(1);
    })
    test("testing a miss on an empty cell", () => {
        const gBoard6 = new Gameboard(5);
        gBoard6.placeShip(2,[1,1],"x",gBoard6.board);
        gBoard6.receiveAttack([0,1], gBoard6.board);
        const testShip = gBoard6.board[1][1];
        expect(testShip.hits).toEqual(0);
        expect(gBoard6.board[0][1]).toBe("0");
    })
    test("testing a miss on a previously missed cell", () => {
        const gBoard7 = new Gameboard(5);
        gBoard7.placeShip(2,[2,2],"y",gBoard7.board);
        gBoard7.receiveAttack([0,1], gBoard7.board);
        gBoard7.receiveAttack([0,1], gBoard7.board);
        const testShip = gBoard7.board[2][2];
        expect(testShip.hits).toEqual(0);
        expect(gBoard7.board[0][1]).toBe("0");

    })
})