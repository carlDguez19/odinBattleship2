import { Gameboard } from "./gameboard";
import { delay, cpuHitOrMiss, clearGrid, displayShips,consecutiveHit } from "./uiController";
import { coordsNotTaken, fitsOnBoard, displayWinner, getRandomIntInclusive } from "./boardUtils";
import { setupCellClicker } from "./setupListeners";
import { cellClicker } from "./listenerFuncs";

export class Player{
    constructor(type, name){
        this.name = name;
        this.type = type;
        this.pBoard = new Gameboard();
    }
    cpuPicksCoords(enemy){
        //returns coords
        let coords = [];
        let attempts = 0;
        do{
            coords = [];
            for(let i = 0; i < 2; i++){
                let randInt = getRandomIntInclusive(0, 9);//get a random int between 0 and 9
                coords.push(randInt);
            }
            attempts++;
            if(attempts > 2000){//safety to prevent loop
                throw new Error("CPU attempts have exceeded safe limits. Logic is most likely broken.");
            }
        }while(!(enemy.pBoard.receiveAttack(coords, enemy.pBoard.board)));//while coords are taken look for new coords
        return coords;
    }
    cpuPicksShipsLocations(arr,cpu){
        for(let j = 0; j < arr.length; j++){//going through each ship which is a copy of players ships and picking a new location for cpu
            let coords = [];
            let axis = 0;
            do{
                coords = [getRandomIntInclusive(0,9),getRandomIntInclusive(0,9)];
                axis = getRandomIntInclusive(0,1);    
            }while(!fitsOnBoard(arr[j].length, coords, axis, cpu)||!coordsNotTaken(cpu.pBoard.board,coords,axis,arr[j].length));//if it doesnt fit on board or coords are taken look for new coords
            cpu.pBoard.placeShip(arr[j].length,coords,axis,arr[j].id, cpu);
            let p2gbt = document.querySelector(".player2Board");
            let tableFin = p2gbt.firstElementChild;
            displayShips(tableFin, cpu);
        }
    }
    async cpuPlayerAttacks(playerTrueBoardDOM, winner, enemy, truePlayer, cpuHiddenTable){//called by human(coords from cpuPicksCoords)
        let gbt = document.querySelector(playerTrueBoardDOM);
        let trueTable = gbt.firstElementChild;
        let coords = this.cpuPicksCoords(enemy);//get coords to attack
        while(enemy.pBoard.board[coords[0]][coords[1]] == "X"){//if we hit a ship let cpu attack again
            consecutiveHit(enemy, coords, trueTable);
            await delay(700);
            coords = this.cpuPicksCoords(enemy);
        }
        cpuHitOrMiss(enemy.pBoard.board, coords, trueTable);//update trueBoard DOM
        //add logic to check if all ships sunk
        if(enemy.pBoard.allShipsSunk()){
            clearGrid(cpuHiddenTable);
            clearGrid(trueTable);
            displayWinner(winner);
        }
        else if(truePlayer.pBoard.allShipsSunk()){
            clearGrid(cpuHiddenTable);
            clearGrid(trueTable);
            displayWinner(winner-1);
        }
    }

    clickCellCore({playerHiddenBoardDOM, playerTrueBoardDOM, enemyTrueBoard, enemyHiddenBoard, winner, enemy, truePlayer , gameType}){//setup listener for cell click
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