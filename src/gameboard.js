import { Ship } from "./ship";

export class Gameboard{
    constructor(size){
        this.size = size;
        this.numOfShips = 0;
        this.ships = [];
    }
    generateGameboard(size){
        let arr = [];
        for(let i = 0; i < size; i++){
            arr[i] = new Array(size);
        }
        return arr;
    }
    placeShip(length, coords, axis, board){
        if(coordsInRange && coordsNotTaken){
            const testShip = new Ship(length);
            this.ships.append(testShip);
            if(axis == "y"){//if ship is placed vertically then fill the cells it will take up with the length
                for(let i = 0; i < length; i++){
                    board[coords[0]+i][coords[1]] = length;
                }
            }else{
                for(let i = 0; i < length; i++){
                    board[coords[0]][coords[1]+1] = length;
                }
            }
        }
    }

}