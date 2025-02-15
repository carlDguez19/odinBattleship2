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
    
        let totalCells = this.pBoard.size * this.pBoard.size;
    
        //fill grid with divs
        for(let i = 0; i < totalCells; i++){
            let cell = document.createElement('div');
            cell.style.backgroundColor = "darkred";
            cell.style.borderRadius = "5px";
            gc.appendChild(cell);
        }
    }

    clearGrid(grid){
        let cells = grid.querySelectorAll('div');
        cells.forEach((cell) => {
            cell.remove();
        })
    }
}