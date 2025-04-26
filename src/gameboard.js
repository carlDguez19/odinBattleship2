import { Ship } from "./ship";
import { Player } from "./player";

export class Gameboard{
    constructor(size){
        this.size = size;
        this.numOfShips = 0;
        this.ships = [];
        this.board = this.generateGameboard(this.size);
        this.delay = ms => new Promise(res => setTimeout(res, ms));
    }
    generateGameboard(size){
        let arr = [];
        for(let i = 0; i < size; i++){
            arr[i] = new Array(size);
        }
        return arr;
    }
    coordsNotTaken(board, coords, axis, length){//cells are empty before placing
        if(axis == 1){//if ship is placed vertically then fill the cells it will take up with the length
            for(let i = 0; i < length; i++){
                if(board[coords[0]+i][coords[1]] != undefined){//if ship at these coords then ...
                    return false;
                }
            }
            return true;
        }else{//ship placed horizontally
            for(let i = 0; i < length; i++){
                if(board[coords[0]][coords[1]+i] != undefined){//if ship at these coords then ...
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
    placeShip(length, coords, axis, id){
        const shipFits = this.fitsOnBoard(length, coords, axis);//pieces of the ship are not left 'hanging' outside the board
        if((length <= 10) && shipFits){//&& shipFits...if ship is not bigger than board itself and ... ^
            const notTaken = this.coordsNotTaken(this.board, coords, axis, length);//we can remove board and replace it with this.baord//make sure spots are empty for ship to be placed
            if(notTaken){
                const testShip = new Ship(length,id,coords,axis);
                this.ships.push(testShip);
                if(axis == 1){//if ship is placed vertically then fill the cells it will take up with the length
                    for(let i = 0; i < length; i++){
                        this.board[coords[0]+i][coords[1]] = testShip;
                    }
                    this.numOfShips++;
                }else{//ship placed horizontally
                    for(let i = 0; i < length; i++){
                        this.board[coords[0]][coords[1]+i] = testShip;
                    }
                    this.numOfShips++;
                }
            }
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
    removeShip(ship){
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
                this.numOfShips--;
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
    updateHitOrMiss(coords,table){
        if(this.board[coords[0]][coords[1]] == "0"){
            //update table cell to miss
            const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
            const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
            cell.style.backgroundColor = "teal";
        }else if(this.board[coords[0]][coords[1]] == "X"){
            //update ship to hit
            const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
            const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
            cell.style.backgroundColor = "darkred";
            cell.style.borderRadius = "50px";
        }
    }
    cpuHitOrMiss(coords,table){
        if(this.board[coords[0]][coords[1]] == "0"){
            //update table cell to miss
            const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
            const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
            this.cpuMissedCell(cell);
            //cell.style.backgroundColor = "teal";
        }else if(this.board[coords[0]][coords[1]] == "X"){
            //update ship to hit
            const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
            const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
            this.cpuShipAttackedCell(cell);
        }
    }

    async cpuShipAttackedCell(cell){
        await this.delay(700);
        cell.style.backgroundColor = "darkred";
        cell.style.borderRadius = "50px";
    }
    async cpuMissedCell(cell){
        await this.delay(700);
        cell.style.backgroundColor = "teal";
    }

}

let winnerOverlay = document.querySelector(".winnerOverlay");
let multShipsDiagram = document.querySelector(".shipsDiagram");
let multShipsMovement = document.querySelector(".multShipsPlacementOverlay");
export function displayWinner(winner){
   let winnerMsg = document.querySelector(".trueWinner");
    winnerMsg.textContent = "player " + winner;
    winnerOverlay.style.animation = "enterTop 1s forwards";
}

const gameTypesubmitButton = document.querySelector(".submitButton");
const gameTypecloseButton = document.querySelector(".closeButton");
const pvp = document.querySelector(".pvp");
const pve = document.querySelector(".pve");
export const gameTypeOverlay = document.querySelector(".playerSelectionOverlay");

const shipCoordsOverlay = document.querySelector(".shipInputsOverlay");
const shipCoordsSubmit = document.querySelector(".confirmCoords");
const shipCoordsCancel = document.querySelector(".cancelCoords");
const xAxis = document.querySelector(".xAxis");
const yAxis = document.querySelector(".yAxis");
const xRadio = document.querySelector(".xRadio");
const yRadio = document.querySelector(".yRadio");
let multShipSize = 0;
let multOKClicked = false;

function clearBoard(player){
    player.pBoard.board = player.pBoard.generateGameboard(10);
    player.pBoard.ships = [];
}

function multShipsListener(player,enemy){
    let multShipsDiagram = document.querySelector(".shipsDiagram");
    let confirmShipsButton = document.querySelector(".confirmShip");
    let cancelShipsOverlay = document.querySelector(".cancelShip");
    multShipsDiagram.addEventListener('click', (e) => {
        if(e.target.tagName === "TABLE"||e.target.tagName === "TD"){
            multShipSize = e.target.className;
            shipCoordsOverlay.style.animation = "enterTop 1s forwards";
        }
    })
    confirmShipsButton.addEventListener('click', function(){
        if(player.pBoard.numOfShips == 5 && enemy.pBoard.numOfShips == 0 && enemy.type == "real"){
            // reset the overlay for coords
            coordsOverlayReset();
            player.censorCurtainEnter();
            multShipsMovement.style.animation = "slideLeft 0.5s forwards";
            player.censorCurtainExit();
            multOKClicked = true;
        }else if(player.pBoard.numOfShips == 5 && enemy.type=="cpu"){
            //enemy picks random locations for its ships no need for the multShipOverlay
            let enemyArr = player.pBoard.ships;
            coordsOverlayReset();
            multShipsDiagram.style.animation = "exitUp 2s forwards";
            enemy.cpuPicksShipsLocations(enemyArr);
        }else if(enemy.pBoard.numOfShips == 5){
            //get rid of all overlays and start game
            coordsOverlayReset();
            multShipsDiagram.style.animation = "exitUp 2s forwards";
        }
    })
    cancelShipsOverlay.addEventListener('click', function(){
        //clear whatever has been done to place ships on either board
        //take away multShipsOverlay and bring in gameType overlay
        coordsOverlayReset();
        clearBoard(player);
        clearBoard(enemy);
        multShipsDiagram.style.animation = "exitUp 2s forwards";
        gameTypeOverlay.style.animation = "enterTop 1s forwards";
    })
    //add listener for submit and close buttons if enemy in params then call censor curtain then call mult ships again for enemy???
}

function coordsOverlayListener(player1,player2){//,hiddenTable,trueTable
    shipCoordsSubmit.addEventListener("click", function(){
        let player;
        let trueTable;
        let hOrV;
        let shipLength = Number(multShipSize.charAt(0));
        let xCoord = Number(xAxis.value);
        let yCoord = Number(yAxis.value);
        if(player1.pBoard.numOfShips <= 5 && !multOKClicked){
            player = player1;
            let p1gbt = document.querySelector(".player1Board");
            trueTable = p1gbt.firstElementChild;
        }else{
            player = player2;
            let p2gbt = document.querySelector(".player2Board");
            trueTable = p2gbt.firstElementChild;
        }
        for(let i = 0; i < player.pBoard.ships.length; i++){
            let ship = player.pBoard.ships[i];
            if(ship.id == multShipSize){//clicked on multShip was already placed before
                //remove previous location of ship
                player.pBoard.removeShip(ship);
            }
        }
        if(xRadio.checked){
            hOrV = 0;
        }else{
            hOrV = 1;
        }
        if(player.pBoard.coordsNotTaken(player.pBoard.board,[xCoord,yCoord],hOrV,shipLength)){
            player.pBoard.placeShip(shipLength,[xCoord,yCoord],hOrV,multShipSize);
            player.displayShips(trueTable);
            coordsOverlayReset();
            shipCoordsOverlay.style.animation = "exitUp 1s forwards";    
        }else{
            coordsOccupiedError();
        }
    })
    shipCoordsCancel.addEventListener('click', function(){
        coordsOverlayReset();
        shipCoordsOverlay.style.animation = "exitUp 1s forwards";
    })
}

function coordsOccupiedError(){
    let coordError = document.querySelector('.coordsTakenOverlay');
    coordError.style.animation = "enterTop 1s forwards";
    setTimeout(() => {
        coordError.style.animation = "exitUp 1s forwards";
    }, 2000);
}

function coordsOverlayReset(){
    xRadio.checked = false;
    yRadio.checked = false;
    xAxis.value = "0";
    yAxis.value = "0";
}

function playAgainButtonListener(p1,p2){
    const playAgainButton = document.querySelector(".playAgain");
    playAgainButton.addEventListener('click',function(){//reset boards here and the 2d arrays
        winnerOverlay.style.animation = "exitUp 1s forwards";
        let curtain = document.querySelector(".censorCurtain");
        curtain.style.animation = 'exitUp 1s forwards';
        clearBoard(p1);
        clearBoard(p2);
        gameTypeOverlay.style.animation = "enterTop 2s forwards";
    })
}

export function gameTypeListeners(){
    gameTypecloseButton.addEventListener('click', function(){
        pvp.checked = false;
        pve.checked = false;
        gameTypeOverlay.style.animation = "exitUp 1s forwards";
    });
    gameTypesubmitButton.addEventListener('click', function(){
        if(pvp.checked){
            //ill put the code here that is currently in the index.js file
            //code for human vs human game
            const player1 = new Player("real", 10);
            const player2 = new Player("real", 10);

            player1.openBoard(".player1Board");
            player2.openBoard(".player2Board");
            player1.openBoard(".player1HiddenBoard");
            player2.openBoard(".player2HiddenBoard");

            multShipsMovement.style.animation = "diagonalRight 2s forwards";
            multShipsListener(player1,player2);
            coordsOverlayListener(player1,player2);

            player1.clickCell(".player1HiddenBoard", ".player1Board", ".player2Board", ".player2HiddenBoard",2);//this means player 2 turn//
            player2.clickCell(".player2HiddenBoard", ".player2Board", ".player1Board", ".player1HiddenBoard",1);//this means player 1 turn//
            playAgainButtonListener(player1,player2);
            pvp.checked = false;
            pve.checked = false;
            gameTypeOverlay.style.animation = "exitUp 1s forwards";
        }
        else if(pve.checked){
            //code for human vs cpu
            const player1 = new Player("real", 10);
            const player2 = new Player("cpu", 10);

            player1.openBoard(".player1Board");
            player2.openBoard(".player2Board");
            player1.openBoard(".player1HiddenBoard");
            player2.openBoard(".player2HiddenBoard");

            multShipsListener(player1,player2);
            coordsOverlayListener(player1,player2);

            // player1.displayShips(".player1Board");
            // player2.displayShips(".player2Board");

            player2.cpuGameClickCell(".player2HiddenBoard",1, player1, ".player1Board");//, ".player2Board"//this means player 1 turn//
            playAgainButtonListener(player1,player2);

            pvp.checked = false;
            pve.checked = false;
            gameTypeOverlay.style.animation = "exitUp 1s forwards";
        }
    })
}