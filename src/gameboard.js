import { Ship } from "./ship";
import { Player } from "./player";
import { winnerOverlay, multShipsMovement, pvp, pve, shipCoordsOverlay, xAxis, yAxis, xRadio, yRadio, gameTypeOverlay, setMultShipSize, getMultShipSize, setMultOKClicked, getMultOKClicked } from "./domElemConst";
import { shipTypeClicker, confirmAllShipsPlaced, acceptCoordInputs, cancelCoordsInput, playAgainReset } from "./setupListeners";
import { placeShipOnBoard } from "./boardUtils";
import { multShipsListener, coordsOverlayListener, playAgainButtonListener } from "./listenerHandlers";
export class Gameboard{
    constructor(){
        this.size = 10;
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
    placeShip(length, coords, axis, id){
        const testShip = new Ship(length,id,coords,axis);
        this.ships.push(testShip);
        placeShipOnBoard(this.board, testShip, coords, axis);
        this.numOfShips++;
    }
    receiveAttack(coords, board){
        if(board[coords[0]][coords[1]] == "X" || board[coords[0]][coords[1]] == "0"){//if previously declared a hit or a miss then leave as a hit or a miss
            return false;
        }
        else{//else emtpy or ship in cell
            if(board[coords[0]][coords[1]] == undefined){//if cell on 2d array is empty then declare a miss
                board[coords[0]][coords[1]] = "0";
                return true;
            }else{
                for(let i = 0; i < this.ships.length; i++){//if cell has a ship then look for that ship in array of ships and .hit()
                    if(board[coords[0]][coords[1]] == this.ships[i]){
                        board[coords[0]][coords[1]] = "X"
                        this.ships[i].hit();
                    }
                }
                return true;
            }
        }
    }
    removeShip(ship, player){
        //ill go through the board array and kill the old ship
        for(let i = 0; i < ship.length; i++){
            if(ship.axis == 0){
                this.board[ship.cdnts[0]][ship.cdnts[1]+i] = undefined;
            }else{
                this.board[ship.cdnts[0]+i][ship.cdnts[1]] = undefined;
            }
        }
        for(let j = 0; j < this.ships.length; j++){//remove the array entry that pertains to the ship
            if(this.ships[j] == ship){
                this.ships.splice(j,1);
                player.pBoard.numOfShips--;
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

export function displayWinner(winner){
   let winnerMsg = document.querySelector(".trueWinner");
    winnerMsg.textContent = "player " + winner;
    winnerOverlay.style.animation = "enterTop 1s forwards";
}