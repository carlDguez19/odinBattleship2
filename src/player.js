import { Gameboard } from "./gameboard";

export class Player{
    constructor(type, length){
        this.type = type;
        this.pBoard = new Gameboard(length);
        this.turnTook = false;//most likely not needed
        this.delay = ms => new Promise(res => setTimeout(res, ms));
    }

    //player should choose location of ships and gameboard should placeShip
    // chooseLocation(length, coords, axis){
    //     if(this.type == "real"){
    //         this.board.placeShip(length, coords, axis, this.board.board);
    //     }else{
    //         //placeShip at random locations if player is a computer player
    //         let row = this.getRndInteger(0, this.board.board.length);
    //         let col = this.getRndInteger(0, this.board.board.length);
    //         let randAxis = this.getRndInteger(0, 2);
    //         this.board.placeShip(length, [row,col], randAxis, this.board.board);
    //     }
    // }

    // getRndInteger(min, max) {
    //     return Math.floor(Math.random() * (max - min) ) + min;
    // }


    clickCell(playerHiddenBoardDOM, playerTrueBoardDOM, enemyOldBoard, enemyNewBoard, winner){//this should update the hidden board and the true board at the same time
        let gbh = document.querySelector(playerHiddenBoardDOM);
        let hiddenTable = gbh.firstElementChild;
        let gbt = document.querySelector(playerTrueBoardDOM);
        let trueTable = gbt.firstElementChild;
        hiddenTable.addEventListener('click', (e) => {
            if(e.target.tagName === 'TD'){
                const row = e.target.parentElement;
                let cIndex = e.target.cellIndex;
                let rIndex = row.rowIndex
                console.log("clicked cell row: " + rIndex + " col: " + cIndex);
                if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){
                    this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);
                    this.pBoard.updateHitOrMiss([rIndex,cIndex], trueTable);
                    this.censorCurtainEnter();
                    this.censorCurtainExit();
                    this.swapEnemyBoards(enemyOldBoard, enemyNewBoard);
                    this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);
                    if(this.pBoard.allShipsSunk()){//      ...for this board, this player loses.
                        console.log("the winner is player "+ winner);
                    }
                    else{
                        this.censorCurtainEnter();
                        this.censorCurtainExit();
                        this.swapEnemyBoards(enemyOldBoard, enemyNewBoard);
                        this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);
                    }
                }
            }
        }
        );
    }

    // updateCellSwapBoards(coords, playerHiddenBoardDOM, playerTrueBoardDOM, enemyOldBoard, enemyNewBoard){//, winner
    //     let gbh = document.querySelector(playerHiddenBoardDOM);
    //     let hiddenTable = gbh.firstElementChild;
    //     let gbt = document.querySelector(playerTrueBoardDOM);
    //     let trueTable = gbt.firstElementChild;
    //     if(this.pBoard.receiveAttack([coords[0],coords[1]],this.pBoard.board)){
    //         this.pBoard.updateHitOrMiss([coords[0],coords[1]], hiddenTable);
    //         this.pBoard.updateHitOrMiss([coords[0],coords[1]], trueTable);
    //         this.swapEnemyBoards(enemyOldBoard, enemyNewBoard);
    //         this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);
    //     }
    // }

    displayShips(playerBoardDOM){
        let gb = document.querySelector(playerBoardDOM);
        let table = gb.firstElementChild;
        for(let i = 0; i < this.pBoard.board.length; i++){
            for(let j = 0; j < this.pBoard.board[i].length; j++){
                if(this.pBoard.board[i][j] != undefined){//if theres a ship at these coords, display it
                    const row = table.rows[i]//querySelector(`tr:nth-child(${i})`);
                    const cell = row.cells[j]//querySelector(`td:nth-child(${j})`);
                    cell.style.backgroundColor = "gray";
                    cell.style.borderRadius = "50px";
                }                
            }
        }
    }

    openBoard(playerBoardDOM){//html element is the param. Create a table/grid
        let gc = document.querySelector(playerBoardDOM);
    
        //clear grid of any previous size grid
        this.clearGrid(gc);
    
        //fill grid with a table for easier access of each cell
        let table = document.createElement('table');
        for(let i = 0; i < this.pBoard.size; i++){
            let row = document.createElement('tr');
            for(let j = 0; j < this.pBoard.size; j++){
                let cell = document.createElement('td');
                cell.style.backgroundColor = "limegreen";
                cell.style.borderRadius = "5px";
                row.appendChild(cell);
            } 
            table.appendChild(row);
        }
        gc.appendChild(table);
    }

    clearGrid(grid){
        let cells = grid.querySelectorAll('div');
        cells.forEach((cell) => {
            cell.remove();
        })
    }

    censorCurtainEnter(){
        let curtain = document.querySelector(".censorCurtain");
        curtain.style.animation = 'curtainEnter 1.8s forwards';
    }
    async censorCurtainExit(){
        await this.delay(5000);
        let curtain = document.querySelector(".censorCurtain");
        curtain.style.animation = 'exitUp 1s forwards';
    }

    async swapBoards(oldBoard, newBoard){
        await this.delay(500);
        let oBoard = document.querySelector(oldBoard);
        let nBoard = document.querySelector(newBoard);
        oBoard.style.animation = 'exitUp 0.5s forwards';
        nBoard.style.animation = 'fadeIn 0.5s forwards';
    }
    async swapEnemyBoards(oldBoard, newBoard){
        await this.delay(500);
        let oBoard = document.querySelector(oldBoard);
        let nBoard = document.querySelector(newBoard);
        oBoard.style.animation = 'fadeOut 0.5s forwards';
        nBoard.style.animation = 'enterTop 0.5s forwards';
    }
}

export function enterPlayerSelectionOverlay(){
    
}

// export let attackCoords = [];

// function clickCellFunc(e){
//     if(e.target.tagName === 'TD'){
//         const row = e.target.parentElement;
//         let cIndex = e.target.cellIndex;
//         let rIndex = row.rowIndex
//         //console.log("clicked cell row: " + rIndex + " col: " + cIndex);
//         attackCoords = [rIndex, cIndex];
//         console.log("attackCoords[0]: "+ attackCoords[0]);
//         console.log("attackCoords[1]: "+ attackCoords[1]);
//         // if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){
//         //     this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);
//         //     this.pBoard.updateHitOrMiss([rIndex,cIndex], trueTable);
//         //     this.swapEnemyBoards(enemyOldBoard, enemyNewBoard);
//         //     this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);
//         //     // if(this.pBoard.allShipsSunk()){//      ...for this board, this player loses.
//         //     //     console.log("the winner is player "+ winner);
//         //     // }
//         //     // else{
//         //     //     this.swapEnemyBoards(enemyOldBoard, enemyNewBoard);
//         //     //     this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);
//         //     // }
//         // }
//     }
// }