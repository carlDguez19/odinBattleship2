import { Ship } from "./ship";

describe("check is hit and isSunk functions work", () => {
    test("ship constructor should return NaN for length of 0", () => {
        const shipTest1 = new Ship(0);
        expect(shipTest1).toEqual({});
    });
    test("ship constructor should create a simple 1 length ship", () => {
        const shipTest2 = new Ship(1);
        expect(shipTest2).toEqual({hits:0, length:1});
    })
    test("hit() should increase hits var by 1", () => {
        const shipTest3 = new Ship(2);
        shipTest3.hit();
        expect(shipTest3.hits).toBe(1);
    });
    test("hit() should increase hits var by 2", () => {
        const shipTest4 = new Ship(2);
        shipTest4.hit();
        shipTest4.hit();
        expect(shipTest4.hits).toBe(2);
    });
    test("isSunk() returns true iff hits == length", () => {
        const shipTest5 = new Ship(1);
        shipTest5.hit();
        shipTest5.hit();
        const sunk = shipTest5.isSunk();
        expect(sunk).toBe(true);
    });
});