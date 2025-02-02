import { Ship } from "./ship";

describe("check is hit and isSunk functions work", () => {
    test("hit() should increase hits var by 1", () => {
        const shipTest1 = new Ship(2);
        console.log("before " + shipTest1.hits);
        shipTest1.hit();
        console.log("after " + shipTest1.hits);
        expect(shipTest1.hits).toBe(1);
    });
});