import { Gameboard } from "./gameboard";

export class Player{
    constructor(type, length){
        this.type = type;
        this.pBoard = new Gameboard(length);
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

    clickCell(playerBoardDOM){
        let gb = document.querySelector(playerBoardDOM);
        let table = gb.firstElementChild;
        table.addEventListener('click', (e) => {
            if(e.target.tagName === 'TD'){
                const row = e.target.parentElement;
                let cIndex = e.target.cellIndex;
                let rIndex = row.rowIndex
                console.log("clicked cell row: " + rIndex + " col: " + cIndex);
                this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board);
                this.pBoard.updateHitOrMiss([rIndex,cIndex],table);
            }
        });
    }

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

    openBoard(playerBoardDOM){//html element is the param
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
}