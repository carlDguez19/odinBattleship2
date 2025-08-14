import { getMultOKClicked, winnerOverlay } from "./domElemConst";
import { fadeINComplete, fadeOUTComplete, clearGrid } from "./uiController";

export function coordsNotTaken(board, coords, axis, length){//cells are empty before placing
    if(axis == 1){
        for(let i = 0; i < length; i++){
            if(board[(coords[0]+i)][coords[1]] != undefined){//if cells at these coords are not undefined return false
                return false;
            }
        }
        return true;//if loop completes then all cells are empty
    }else{//ship placed horizontally
        for(let i = 0; i < length; i++){
            if(board[coords[0]][(coords[1]+i)] != undefined){//if cells at these coords are not undefined return false
                return false;
            }
        }
        return true;//if loop completes then all cells are empty
    }
}

export function fitsOnBoard(length, coords, axis, player){//ship wont be left hanging off board
    if(axis == 1){//ship wont overhang vertically
        if(coords[0]+length <= player.pBoard.size){//if it wont overhang return true
            return true;
        }else{
            return false;
        }
    }else{//ship wont overhang horizontally
        if(coords[1]+length <= player.pBoard.size){//if it wont overhang return true
            return true;
        }else{
            return false;
        }
    }
}

export function placeShipOnBoard(board, ship, coords, axis){//change 2d array to include ship object at coords
    const [row, col] = coords;
    for(let i = 0; i < ship.length; i++){
        let r = axis == 1 ? row + i : row;
        let c = axis == 0 ? col + i : col;
        board[r][c] = ship;
    }
    return board;
}

export function clearBoard(player){
    if(getMultOKClicked() > 0){
        player.pBoard.board = player.pBoard.generateGameboard(player.pBoard.size);
        player.pBoard.ships = [];
        player.pBoard.numOfShips = 0;
    }
}

export function displayWinner(winner){
    let winnerMsg = document.querySelector(".trueWinner");
    winnerMsg.textContent = "player " + winner;
    fadeINComplete(winnerOverlay);
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}