import { Gameboard } from "./gameboard";
import { delay, cpuHitOrMiss, clearGrid, displayShips,consecutiveHit } from "./uiController";
import { getMultOKClicked, setMultOKClicked, getMultShipSize } from "./domElemConst";
import { coordsNotTaken, fitsOnBoard, displayWinner, getRandomIntInclusive } from "./boardUtils";
import { setupCellClicker } from "./setupListeners";
import { cellClicker } from "./listenerFuncs";

export class Player{
    constructor(type){
        this.type = type;
        this.pBoard = new Gameboard();
    }
    cpuPicksCoords(enemy){
        //returns coords
        let coords = [];
        let attempts = 0;
        do{
            coords = [];
            console.log("upcoming coords:");
            for(let i = 0; i < 2; i++){
                let randInt = getRandomIntInclusive(0, 9);
                console.log("cpu picked coords: " + randInt);
                coords.push(randInt);
            }
            attempts++;
            if(attempts > 1000){
                throw new Error("CPU attempts have exceeded safe limits. Logic is most likely broken.");
            }
        }while(!(enemy.pBoard.receiveAttack(coords, enemy.pBoard.board)));//while taken
        return coords;
    }
    cpuPicksShipsLocations(arr,cpu){
        for(let j = 0; j < arr.length; j++){
            let coords = [getRandomIntInclusive(0,9),getRandomIntInclusive(0,9)];
            let axis = getRandomIntInclusive(0,1);
            while(!fitsOnBoard(arr[j].length, coords, axis)||!coordsNotTaken(cpu.pBoard.board,coords,axis,arr[j].length)){
                coords = [getRandomIntInclusive(0,9),getRandomIntInclusive(0,9)];
                axis = getRandomIntInclusive(0,1);
            }
            cpu.pBoard.placeShip(arr[j].length,coords,axis,arr[j].id, cpu);//pass board as param????
            let p2gbt = document.querySelector(".player2Board");
            let tableFin = p2gbt.firstElementChild;
            displayShips(tableFin, cpu);
        }
    }
    cpuPlayerAttacks(playerTrueBoardDOM, winner, enemy, truePlayer, cpuHiddenTable){//called by human(coords from cpuPicksCoords)
        let gbt = document.querySelector(playerTrueBoardDOM);
        let trueTable = gbt.firstElementChild;
        let coords = this.cpuPicksCoords(enemy);
        while(enemy.pBoard.board[coords[0]][coords[1]] == "X"){
            consecutiveHit(enemy, coords, trueTable);
            coords = this.cpuPicksCoords(enemy);
        }
        cpuHitOrMiss(enemy.pBoard.board, coords, trueTable);//update trueBoard
        //add logic to check if all ships sunk
        if(enemy.pBoard.allShipsSunk()){
            console.log("the winner is player "+ (winner));
            clearGrid(cpuHiddenTable);
            clearGrid(trueTable);
            displayWinner(winner);
        }
        else if(truePlayer.pBoard.allShipsSunk()){
            console.log("the winner is player "+ winner-1);
            clearGrid(cpuHiddenTable);
            clearGrid(trueTable);
            displayWinner(winner-1);
        }
    }

    clickCellCore({playerHiddenBoardDOM, playerTrueBoardDOM, enemyTrueBoard, enemyHiddenBoard, winner, enemy, truePlayer , gameType}){//, playerTrueBoardDOM//this should update the hidden board and the true board at the same time
        this.playerHiddenBoardDOM = playerHiddenBoardDOM;
        this.playerTrueBoardDOM = playerTrueBoardDOM;
        this.enemyTrueBoard = enemyTrueBoard;
        this.enemyHiddenBoard = enemyHiddenBoard;
        this.winner = winner;
        this.enemy = enemy;
        this.truePlayer = truePlayer;
        this.gameType = gameType;
        let gbt;
        let gbh = document.querySelector(playerHiddenBoardDOM);
        this.hiddenTable = gbh.firstElementChild;
        if(gameType == "pvp"){
            gbt = document.querySelector(playerTrueBoardDOM);
        }else{
            gbt = document.querySelector(enemyTrueBoard);
        }
        this.trueTable = gbt.firstElementChild;
        this.boundedCellClicker = cellClicker.bind(this);
        setupCellClicker(this.hiddenTable, this.boundedCellClicker);
    }
}