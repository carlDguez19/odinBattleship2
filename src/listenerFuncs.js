import { winnerOverlay, setMultOKClicked, getMultOKClicked, setMultShipSize, getMultShipSize, shipCoordsOverlay, multShipsMovement, gameTypeOverlay, xAxis, yAxis, xRadio, yRadio, pvp, pve } from "./domElemConst";
import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { coordsNotTaken, fitsOnBoard, clearBoard, displayWinner } from "./boardUtils";
import { multShipsListener, coordsOverlayListener, playAgainButtonListener, removeListeners, gameTypeListeners } from "./setupListeners";
import { updateHitOrMiss, clearGrid, coordsOverlayReset, coordsOccupiedError, censorCurtainEnter, censorCurtainExit, swapBoards, swapEnemyBoards, openBoard, displayShips, fadeIN, fadeOUT, fadeINComplete, fadeOUTComplete } from "./uiController";

export function shipTypeClicker(e){
    if(e.target.tagName === "TABLE"||e.target.tagName === "TD"){
        setMultShipSize(e.target.className);
        fadeINComplete(shipCoordsOverlay);
    }
}


export function confirmAllShipsPlaced(player, enemy){
        if(player.pBoard.numOfShips == 5 && enemy.pBoard.numOfShips == 0 && enemy.type == "real"){//p1(real) has placed all ships
            // reset the overlay for coords
            coordsOverlayReset();
            censorCurtainEnter();
            multShipsMovement.style.animation = "slideOverP1 2s forwards";
            shipCoordsOverlay.style.animation = "slideOverP1 2s forwards";
            censorCurtainExit();
            setMultOKClicked(getMultOKClicked() + 1);
        }else if(player.pBoard.numOfShips == 5 && enemy.pBoard.numOfShips == 0 && enemy.type=="cpu"){//p1(real) placed all ships p2(cpu) picks locations of ships and game starts 
            //enemy picks random locations for its ships no need for the multShipOverlay
            censorCurtainEnter();
            fadeOUT('.player2Board');
            let enemyArr = [...player.pBoard.ships];//copy of player1(real) ships
            enemy.cpuPicksShipsLocations(enemyArr,enemy);  
            coordsOverlayReset();
            censorCurtainExit();
            fadeOUTComplete(multShipsMovement);
            setMultOKClicked(getMultOKClicked() + 1);
        }else if(enemy.pBoard.numOfShips == 5){//p2(real) has placed all ships)
            //get rid of all overlays and start game
            censorCurtainEnter();
            coordsOverlayReset();
            censorCurtainExit();
            fadeOUTComplete(multShipsMovement);
            multShipsMovement.style.animation = "slideBackP2 2s forwards";
            shipCoordsOverlay.style.animation = "slideBackP2 2s forwards";
            fadeIN('.player2HiddenBoard');
            fadeOUT('.player2Board');
            setMultOKClicked(getMultOKClicked() + 1);
        }
}


export function acceptCoordInputs(player1, player2){
    let player;
    let trueTable;
    let hOrV;
    let shipLength = Number(getMultShipSize().charAt(0));
    let xCoord = Number(xAxis.value);
    let yCoord = Number(yAxis.value);
    if(player1.pBoard.numOfShips <= 5 && getMultOKClicked() == 0){//player 1 placing ships
        player = player1;
        let p1gbt = document.querySelector(".player1Board");
        trueTable = p1gbt.firstElementChild;
    }else{//player 2 placing ships
        player = player2;
        let p2gbt = document.querySelector(".player2Board");
        trueTable = p2gbt.firstElementChild;
    }
    for(let i = 0; i < player.pBoard.ships.length; i++){//check if ship of this type was already placed if so remove it
        let ship = player.pBoard.ships[i];
        if(ship.id == getMultShipSize()){//clicked on multShip was already placed before
            //remove previous location of ship
            player.pBoard.removeShip(ship, player);//WILL NEED PLAYER AS PARAMETER FOR NUMSHIPS--
        }
    }

    if(xRadio.checked){
        hOrV = 0;
    }else{
        hOrV = 1;
    }

    if(xRadio.checked == false && yRadio.checked == false){
        coordsOccupiedError();
    }
    else if(fitsOnBoard(shipLength, [xCoord,yCoord], hOrV, player) && coordsNotTaken(player.pBoard.board,[xCoord,yCoord],hOrV,shipLength)){
        player.pBoard.placeShip(shipLength,[xCoord,yCoord],hOrV,getMultShipSize(), player);//if it fits and coords are available place and display ship
        displayShips(trueTable, player);
        coordsOverlayReset();
        fadeOUTComplete(shipCoordsOverlay);
    }else{
        coordsOccupiedError();
    }
}

export function cancelCoordsInput(){
    coordsOverlayReset();
    fadeOUTComplete(shipCoordsOverlay);
}

export function playAgainReset(){//reset game to initial state if play again clicked
    fadeOUTComplete(winnerOverlay);
    pvp.checked = false;
    pve.checked = false;
    fadeINComplete(gameTypeOverlay);
    setMultOKClicked(0);
    removeListeners();
    gameTypeListeners();
}

export function gameTypeSubmitListenerFunction(){
    if(getMultOKClicked() > 0) return;//safety to prevent multiple clicks
    let player1 = new Player("real", "Player1");
    let player2 = new Player("real", "Player2");
    
    clearBoard(player1);
    clearBoard(player2);

    fadeINComplete(gameTypeOverlay);

    setMultOKClicked(0);

    openBoard(".player1Board", player1);//generate tables for both players boards(hidden and true)
    openBoard(".player2Board", player2);
    openBoard(".player1HiddenBoard", player1);
    openBoard(".player2HiddenBoard", player2);
    fadeIN(".player1Board");
    if(pvp.checked){
        fadeOUTComplete(gameTypeOverlay);
        fadeIN(".player2Board");
        player1.clickCellCore({
            playerHiddenBoardDOM: ".player1HiddenBoard",
            playerTrueBoardDOM: ".player1Board",
            enemyTrueBoard: ".player2Board",
            enemyHiddenBoard: ".player2HiddenBoard",
            winner: 2,
            gameType: "pvp"});//this means player 2 turn
        player2.clickCellCore({
            playerHiddenBoardDOM: ".player2HiddenBoard",
            playerTrueBoardDOM: ".player2Board",
            enemyTrueBoard: ".player1Board",
            enemyHiddenBoard: ".player1HiddenBoard",
            winner: 1,
            gameType: "pvp"});//this means player 1 turn
        fadeINComplete(multShipsMovement);
    }else{//pve selected
        fadeOUTComplete(gameTypeOverlay);
        fadeIN('.player2HiddenBoard');
        player2.type = "cpu";
        player2.clickCellCore({
            playerHiddenBoardDOM: ".player2HiddenBoard",
            enemyTrueBoard: ".player1Board",
            winner: 1,
            enemy: player1,
            truePlayer: player2,
            gameType: "cpu"});//this means player 1 turn
        fadeINComplete(multShipsMovement);
    }
    
    multShipsListener(player1,player2);
    coordsOverlayListener(player1,player2);

    playAgainButtonListener(player1,player2);
    
}

export function cellClicker(e){//when a cell is clicked
        if(e.target.tagName === 'TD' && getMultOKClicked() > 0){
            const row = e.target.parentElement;
            let cIndex = e.target.cellIndex - 1;
            let rIndex = row.rowIndex - 1//get coords of cell
            if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){//determine if miss or hit
                if(!(this.pBoard.allShipsSunk())){//      if ships have not been sunk then...
                    updateHitOrMiss(this.pBoard.board, [rIndex,cIndex], this.hiddenTable);//update hiddenBoard
                    if(this.gameType == "pvp"){
                        updateHitOrMiss(this.pBoard.board, [rIndex,cIndex], this.trueTable);//update trueBoard
                    }
                    if(this.pBoard.board[rIndex][cIndex] == "0"){//if we missed then switch to enemy turn
                        if(this.gameType == "pvp"){//switch to human enemy turn
                            censorCurtainEnter();
                            censorCurtainExit();
                            swapEnemyBoards(this.enemyTrueBoard, this.enemyHiddenBoard);//swap the enemy boards(hidden and true)
                            swapBoards(this.playerHiddenBoardDOM, this.playerTrueBoardDOM);//swap our boards(hidden and true)
                        }else{//switch to cpu enemy turn
                            this.cpuPlayerAttacks(".player1Board",2, this.enemy, this.truePlayer, this.hiddenTable);
                        }
                    }
                }
                else{//if all ships sunk then display winner
                    if(this.gameType == "pvp"){
                        let enemyOldTable = document.querySelector(this.enemyTrueBoard);//current players boards
                        let enemyNewTable = document.querySelector(this.enemyHiddenBoard);
                        fadeOUT(this.playerHiddenBoardDOM);
                        fadeIN(this.playerTrueBoardDOM);
                        clearGrid(enemyOldTable.firstElementChild);
                        clearGrid(enemyNewTable.firstElementChild);
                    }
                    clearGrid(this.hiddenTable);//clear out boards(enemy boards)
                    clearGrid(this.trueTable);
                    displayWinner(this.winner);
                }
            }
        }
}