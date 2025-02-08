import { Ship } from "./ship";

export class Gameboard{
    constructor(size){
        this.size = size;
        this.numOfShips = 0;
        this.ships = [];
        this.board = this.generateGameboard(this.size);
    }
    generateGameboard(size){
        let arr = [];
        for(let i = 0; i < size; i++){
            arr[i] = new Array(size);
        }
        return arr;
    }
    coordsInRange(coords){//starting coordinates are not off the board
        if(coords[0] < this.size && coords[1] < this.size){
            return true;
        }else{
            return false;
        }
    }
    coordsNotTaken(board, coords, axis, length){//cells are empty before placing
        if(axis == "y"){//if ship is placed vertically then fill the cells it will take up with the length
            for(let i = 0; i < length; i++){
                if(board[coords[0]+i][coords[1]] != undefined){
                    return false;
                }
            }
            return true;
        }else{//ship placed horizontally
            for(let i = 0; i < length; i++){
                if(board[coords[0]][coords[1]+i] != undefined){
                    return false;
                }
            }
            return true;
        }
    }
    fitsOnBoard(length, coords, axis){//ship wont be left hanging off board
        if(axis == "y"){
            if(coords[0]+length < this.size){
                return true;
            }else{
                return false;
            }
        }else{
            if(coords[1]+length < this.size){
                return true;
            }else{
                return false;
            }
        }
    }
    placeShip(length, coords, axis, board){
        const inRange = this.coordsInRange(coords);//coordinates are not bigger than the board itself
        const shipFits = this.fitsOnBoard(length, coords, axis);//pieces of the ship are not left 'hanging' outside the board
        if((length <= this.size) && inRange && shipFits){//if ship is not bigger than board itself and ... ^
            const notTaken = this.coordsNotTaken(board, coords, axis, length);//make sure spots are empty for ship to be placed
            if(notTaken){
                const testShip = new Ship(length);
                this.ships.push(testShip);
                if(axis == "y"){//if ship is placed vertically then fill the cells it will take up with the length
                    for(let i = 0; i < length; i++){
                        board[coords[0]+i][coords[1]] = testShip;
                    }
                    this.numOfShips++;
                }else{//ship placed horizontally
                    for(let i = 0; i < length; i++){
                        board[coords[0]][coords[1]+i] = testShip;
                    }
                    this.numOfShips++;
                }
                // return board;//maybe not needed
            }
        }
    }
    receiveAttack(coords, board){
        if(board[coords[0]][coords[1]] == undefined || board[coords[0]][coords[1]] == "0"){//if cell on 2d array is empty OR was previously a miss then declare a miss
            console.log('hereagain');
            board[coords[0]][coords[1]] = "0";
        }else{
            for(let i = 0; i < this.ships.length; i++){//if cell has a ship then look for that ship in array of ships and .hit()
                console.log("at coords: " + board[coords[0]][coords[1]]);
                console.log("in ship arr: " + this.ships[i]);
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