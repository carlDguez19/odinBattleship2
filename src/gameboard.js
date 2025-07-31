import { Ship } from "./ship";
import { Player } from "./player";
import { winnerOverlay, multShipsMovement, pvp, pve, shipCoordsOverlay, xAxis, yAxis, xRadio, yRadio, gameTypeOverlay, setMultShipSize, getMultShipSize, setMultOKClicked, getMultOKClicked } from "./domElemConst";
import { shipTypeClicker, confirmAllShipsPlaced, acceptCoordInputs, cancelCoordsInput, playAgainReset } from "./setupListeners";
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
    coordsNotTaken(board, coords, axis, length){//cells are empty before placing
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
    fitsOnBoard(length, coords, axis){//ship wont be left hanging off board
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
    printBoardArray(boardArr){
        for(let i = 0; i < boardArr.length; i++){
            for(let j = 0; j < boardArr[i].length; j++){
                console.log(boardArr[i][j]);
            }
            console.log("newLine");
        }
    }
    placeShip(length, coords, axis, id, player){
        const testShip = new Ship(length,id,coords,axis);
        this.ships.push(testShip);
        if(axis == 1){//if ship is placed vertically then fill the cells it will take up with the length
            for(let i = 0; i < length; i++){
                this.board[coords[0]+i][coords[1]] = testShip;
            }
            //player.pBoard.numOfShips++;
            this.numOfShips++;
        }else{//ship placed horizontally
            for(let i = 0; i < length; i++){
                this.board[coords[0]][coords[1]+i] = testShip;
            }
            //player.pBoard.numOfShips++;
            this.numOfShips++;
        }
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

function clearBoard(player){
    if(getMultOKClicked() > 0){
        player.pBoard.board = player.pBoard.generateGameboard(player.pBoard.size);
        player.pBoard.ships = [];
        player.pBoard.numOfShips = 0;
        
        console.log("player1 board is the following: " + JSON.stringify(player1.pBoard.board, null, 2));
        console.log("player2 board is the following: " + player2.pBoard.board);
    }
}

function multShipsListener(player,enemy){
    let multShipsDiagram = document.querySelector(".shipsDiagram");
    let confirmShipsButton = document.querySelector(".confirmShip");
    multShipsDiagram.addEventListener('click', shipTypeClicker);
    const wrapConfirmShipsPlaced = () => confirmAllShipsPlaced(player, enemy);
    confirmShipsButton.addEventListener('click', wrapConfirmShipsPlaced)
}

function coordsOverlayListener(player1,player2){//,hiddenTable,trueTable
    const shipCoordsSubmit = document.querySelector(".confirmCoords");
    const shipCoordsCancel = document.querySelector(".cancelCoords");
    const wrapAcceptCoordInputs = () => acceptCoordInputs(player1, player2);
    shipCoordsSubmit.addEventListener("click", wrapAcceptCoordInputs)
    shipCoordsCancel.addEventListener('click', cancelCoordsInput)
}

function playAgainButtonListener(p1,p2){
    const playAgainButton = document.querySelector(".playAgain");
    playAgainButton.addEventListener('click',playAgainReset)
}
let player1, player2;

export function gameTypeListeners(){
    const gameTypesubmitButton = document.querySelector(".submitButton");
    gameTypesubmitButton.addEventListener('click', gameTypeSubmitListenerFunction);
}

function gameTypeSubmitListenerFunction(){
    clearBoard(player1);
    clearBoard(player2);

    setMultOKClicked(0);

    player1 = new Player("real", 10);
    player2 = new Player("real", 10);

    player1.openBoard(".player1Board");
    player2.openBoard(".player2Board");
    player1.openBoard(".player1HiddenBoard");
    player2.openBoard(".player2HiddenBoard");

    //{playerHiddenBoardDOM, playerTrueBoardDOM, enemyTrueBoard, enemyHiddenBoard, winner, enemy,gameType}
    if(pvp.checked){
        gameTypeOverlay.style.animation = "exitUp 1s forwards";
        player1.clickCellCore({
            playerHiddenBoardDOM: ".player1HiddenBoard",
            playerTrueBoardDOM: ".player1Board",
            enemyTrueBoard: ".player2Board",
            enemyHiddenBoard: ".player2HiddenBoard",
            winner: 2,
            gameType: "pvp"});//this means player 2 turn//here i will add the type of game i.e pvp or pve
        player2.clickCellCore({
            playerHiddenBoardDOM: ".player2HiddenBoard",
            playerTrueBoardDOM: ".player2Board",
            enemyTrueBoard: ".player1Board",
            enemyHiddenBoard: ".player1HiddenBoard",
            winner: 1,
            gameType: "pvp"});//this means player 1 turn//here i will add the type of game i.e pvp or pve
        multShipsMovement.style.animation = "diagonalRight 2s forwards";
    }else{
        gameTypeOverlay.style.animation = "exitUp 1s forwards";
        player2.type = "cpu";
        player2.clickCellCore({
            playerHiddenBoardDOM: ".player2HiddenBoard",
            enemyTrueBoard: ".player1Board",
            winner: 1,
            enemy: player1,
            gameType: "cpu"});//, ".player2Board"//this means player 1 turn//
        //player2.clickCellCore(".player2HiddenBoard", ".player1Board", 1, player1)
        multShipsMovement.style.animation = "diagonalRight 2s forwards";
    }
    
    multShipsListener(player1,player2);
    coordsOverlayListener(player1,player2);

    playAgainButtonListener(player1,player2);
}