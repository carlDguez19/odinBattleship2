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
    coordsInRange(coords){
        if(coords[0] < this.size && coords[1] < this.size){
            return true;
        }
        return false;
    }
    coordsNotTaken(board, coords){
        if(board[coords[0]][coords[1]] == undefined){
            return true;
        }
        return false;
    }
    placeShip(length, coords, axis, board){
        const inRange = this.coordsInRange(coords);
        const notTaken = this.coordsNotTaken(board, coords);
        if(inRange && notTaken){
            const testShip = new Ship(length);
            this.ships.append(testShip);
            if(axis == "y"){//if ship is placed vertically then fill the cells it will take up with the length
                for(let i = 0; i < length; i++){
                    board[coords[0]+i][coords[1]] = testShip;
                }
            }else{//ship placed horizontally
                for(let i = 0; i < length; i++){
                    board[coords[0]][coords[1]+1] = testShip;
                }
            }
            return board;//maybe not needed
        }
    }
    receiveAttack(coords, board){
        if(board[coords[0]][coords[1]] == undefined || board[coords[0]][coords[1]] == "0"){//if cell on 2d array is empty or was previously a miss then declare a miss
            board[coords[0]][coords[1]] == "0";
        }else{
            for(let i = 0; i < this.ships.length; i++){//if cell has a ship then look for that ship in array of ships and .hit()
                if(board[coords[0]][coords[1]] == this.ships[i]){
                    this.ships[i].hit();
                }
            }
        }
    }
    allShipsSunk(){
        for(let i = 0; i < this.ships.length; i++){
            let sunk = this.ships[i].isSunk();//if even one ship is not sunk return false
            if(!sunk){
                return false;
            }
        }
        return true;//if we made it outside the loop then all ships are sunk
    }

}