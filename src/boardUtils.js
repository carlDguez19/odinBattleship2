import { getMultOKClicked } from "./domElemConst";
export function coordsNotTaken(board, coords, axis, length){//cells are empty before placing
    console.log("new ship of length " + length);
    if(axis == 1){//if ship is placed vertically then fill the cells it will take up with the length
        for(let i = 0; i < length; i++){
            console.log("coord 0: " + (coords[0]+i));
            console.log("coord 1: " + coords[1]);
            if(board[(coords[0]+i)][coords[1]] != undefined){//if ship at these coords then ...
                return false;
            }
        }
        return true;
    }else{//ship placed horizontally
        for(let i = 0; i < length; i++){
            console.log("coord 0: " + coords[0]);
            console.log("coord 1: " + (coords[1]+i));
            if(board[coords[0]][(coords[1]+i)] != undefined){//if ship at these coords then ...
                return false;
            }
        }
        return true;
    }
}

export function fitsOnBoard(length, coords, axis){//ship wont be left hanging off board
    if(axis == 1){//ship wont overhang vertically
        if(coords[0]+length <= 10){//this.size
            return true;
        }else{
            return false;
        }
    }else{//ship wont overhang horizontally
        if(coords[1]+length <= 10){//this.size
            return true;
        }else{
            return false;
        }
    }
}

export function placeShipOnBoard(board, ship, coords, axis){
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
        
        console.log("player1 board is the following: " + JSON.stringify(player1.pBoard.board, null, 2));
        console.log("player2 board is the following: " + player2.pBoard.board);
    }
}