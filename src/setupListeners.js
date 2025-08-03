import { setMultOKClicked, getMultOKClicked, setMultShipSize, getMultShipSize, shipCoordsOverlay, multShipsMovement, gameTypeOverlay, xAxis, yAxis, xRadio, yRadio, pvp, pve } from "./domElemConst";
import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { coordsNotTaken, fitsOnBoard, clearBoard, displayWinner } from "./boardUtils";
import { multShipsListener, coordsOverlayListener, playAgainButtonListener } from "./listenerHandlers";
import { updateHitOrMiss, clearGrid, coordsOverlayReset, coordsOccupiedError, censorCurtainEnter, censorCurtainExit, swapBoards, swapEnemyBoards, openBoard, displayShips } from "./uiController";

export function shipTypeClicker(e){
    if(e.target.tagName === "TABLE"||e.target.tagName === "TD"){
        //multShipSize = e.target.className;
        setMultShipSize(e.target.className);
        shipCoordsOverlay.style.animation = "enterTop 1s forwards";
    }
}


export function confirmAllShipsPlaced(player, enemy){
        if(player.pBoard.numOfShips == 5 && enemy.pBoard.numOfShips == 0 && enemy.type == "real"){//p1(real) has placed all ships
            // reset the overlay for coords
            coordsOverlayReset();
            censorCurtainEnter();
            multShipsMovement.style.animation = "slideLeft 2s forwards";
            censorCurtainExit();
            setMultOKClicked(getMultOKClicked() + 1);
        }else if(player.pBoard.numOfShips == 5 && enemy.pBoard.numOfShips == 0 && enemy.type=="cpu"){//p1(real) placed all ships p2(cpu) picks locations of ships and game starts 
            //enemy picks random locations for its ships no need for the multShipOverlay
            let enemyArr = [...player.pBoard.ships];
            enemy.cpuPicksShipsLocations(enemyArr,enemy);
            censorCurtainEnter();    
            coordsOverlayReset();
            censorCurtainExit();
            multShipsMovement.style.animation = "exitUp 2s forwards";
            const hidden2Board = document.querySelector(".player2HiddenBoard");
            const true2Board = document.querySelector(".player2Board");
            hidden2Board.style.animation = "enterTopBoard 1s forwards";
            true2Board.style.opacity = 0;
            setMultOKClicked(getMultOKClicked() + 1);
        }else if(enemy.pBoard.numOfShips == 5){//p2(real) has placed all ships)
            //get rid of all overlays and start game
            censorCurtainEnter();
            coordsOverlayReset();
            censorCurtainExit();
            multShipsMovement.style.animation = "exitUp 2s forwards";
            const hidden2Board = document.querySelector(".player2HiddenBoard");
            const true2Board = document.querySelector(".player2Board");
            hidden2Board.style.animation = "enterTopBoard 1s forwards";
            true2Board.style.opacity = 0;
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
    if(player1.pBoard.numOfShips <= 5 && getMultOKClicked() == 0){
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
    else if(fitsOnBoard(shipLength, [xCoord,yCoord], hOrV) && coordsNotTaken(player.pBoard.board,[xCoord,yCoord],hOrV,shipLength)){
        player.pBoard.placeShip(shipLength,[xCoord,yCoord],hOrV,getMultShipSize(), player);//WILL NEED PLAYER AS PARAMETER FOR NUMSHIPS++
        displayShips(trueTable, player);
        coordsOverlayReset();
        shipCoordsOverlay.style.animation = "exitUp 1s forwards";    
    }else{
        coordsOccupiedError();
    }
}

export function cancelCoordsInput(){
    coordsOverlayReset();
    shipCoordsOverlay.style.animation = "exitUp 1s forwards";
}

export function playAgainReset(){
    winnerOverlay.style.animation = "exitUp 1s forwards";
    pvp.checked = false;
    pve.checked = false;
    gameTypeOverlay.style.animation = "enterTop 2s forwards";
    setMultOKClicked(0);
}

export function gameTypeSubmitListenerFunction(){
    if(getMultOKClicked() > 0) return;
    let player1 = new Player("real", 10);
    let player2 = new Player("real", 10);
    
    clearBoard(player1);
    clearBoard(player2);

    setMultOKClicked(0);

    // let player1 = new Player("real", 10);
    // let player2 = new Player("real", 10);

    openBoard(".player1Board", player1);
    openBoard(".player2Board", player2);
    openBoard(".player1HiddenBoard", player1);
    openBoard(".player2HiddenBoard", player2);

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

export function cellClicker(e){//when a cell is clicked
        if(e.target.tagName === 'TD' && getMultOKClicked() > 0){
            const row = e.target.parentElement;//
            let cIndex = e.target.cellIndex;//
            let rIndex = row.rowIndex//get coords of cell
            if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){//determine if miss or hit
                if(!(this.pBoard.allShipsSunk())){//      if ships have not been sunk then...
                    updateHitOrMiss(this.pBoard.board, [rIndex,cIndex], this.hiddenTable);//update hiddenBoard
                    if(this.gameType == "pvp"){
                        updateHitOrMiss(this.pBoard.board, [rIndex,cIndex], this.trueTable);//update trueBoard
                    }
                    if(this.pBoard.board[rIndex][cIndex] == "0"){//if we missed then switch to enemy turn
                        if(this.gameType == "pvp"){//switch to human enemy turn
                            censorCurtainEnter();
                            censorCurtainExit();//bring down curtain and exit
                            swapEnemyBoards(this.enemyTrueBoard, this.enemyHiddenBoard);//swap the enemy boards(hidden and true)
                            swapBoards(this.playerHiddenBoardDOM, this.playerTrueBoardDOM);//swap our boards(hidden and true)
                        }else{//switch to cpu enemy turn
                            this.cpuPlayerAttacks(".player1Board",2, this.enemy, this.hiddenTable);
                        }
                    }
                }
                else{//if all ships sunk then display winner
                    updateHitOrMiss(this.pBoard.board, [rIndex,cIndex], this.hiddenTable);//update hiddenBoard
                    if(this.gameType == "pvp"){
                        updateHitOrMiss(this.pBoard.board, [rIndex,cIndex], this.trueTable);//clear enemy boards if pvp
                        let enemyOldTable = document.querySelector(this.enemyTrueBoard);
                        let enemyNewTable = document.querySelector(this.enemyHiddenBoard);
                        clearGrid(enemyOldTable.firstElementChild);
                        clearGrid(enemyNewTable.firstElementChild);
                    }
                    clearGrid(this.hiddenTable);//clear out boards
                    clearGrid(this.trueTable);
                    displayWinner(this.winner);

                }
            }
        }
}