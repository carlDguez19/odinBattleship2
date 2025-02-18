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
    openBoard(playerBoardDOM){
        let gc = document.querySelector(playerBoardDOM);
    
        //clear grid of any previous size grid
        this.clearGrid(gc);
    
        //set template for grid
        gc.style.gridTemplateColumns = `repeat(${this.pBoard.size}, 1fr)`;
        gc.style.gridTemplateRows = `repeat(${this.pBoard.size}, 1fr)`;
    
        //let totalCells = this.pBoard.size * this.pBoard.size;
    
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