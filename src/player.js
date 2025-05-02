import { displayWinner, Gameboard } from "./gameboard";

export class Player{
    constructor(type, length){
        this.type = type;
        this.pBoard = new Gameboard(length);
        this.gotAttacked = false;
        this.delay = ms => new Promise(res => setTimeout(res, ms));
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    cpuPicksCoords(enemy){
        //returns coords
        let coords = [];
        do{
            coords = [];
            console.log("upcoming coords:");
            for(let i = 0; i < 2; i++){
                let randInt = this.getRandomIntInclusive(0, 9);
                console.log("cpu picked coords: " + randInt);
                coords.push(randInt);
            }
        }while(!(enemy.pBoard.receiveAttack(coords, enemy.pBoard.board)));//while taken
        return coords;
    }
    cpuPicksShipsLocations(arr){
        for(let i = 0; i < arr.length; i++){
            arr[i].coords = [];
        }
        for(let j = 0; j < arr.length; j++){
            arr[j].coords = [];
            let xCoord = this.getRandomIntInclusive(0,9);
            let yCoord = this.getRandomIntInclusive(0,9);
            let coords = [xCoord, yCoord];
            let axis = this.getRandomIntInclusive(0,1);
            while(!(this.pBoard.coordsNotTaken(this.pBoard.board,coords,axis,arr[j].length))){
                xCoord = this.getRandomIntInclusive(0,9);
                yCoord = this.getRandomIntInclusive(0,9);
                coords = [xCoord, yCoord];
                axis = this.getRandomIntInclusive(0,1);
            }
            this.pBoard.placeShip(arr[j].length,coords,axis,arr[j].id);
        }
    }
    cpuPlayerAttacks(playerTrueBoardDOM, winner, enemy,cpuHiddenTable){//called by human(coords from cpuPicksCoords)
        let gbt = document.querySelector(playerTrueBoardDOM);
        let trueTable = gbt.firstElementChild;
        let coords = this.cpuPicksCoords(enemy);
        while(enemy.pBoard.board[coords[0]][coords[1]] == "X"){
            this.consecutiveHit(enemy, coords, trueTable);
            coords = this.cpuPicksCoords(enemy);
        }
        enemy.pBoard.cpuHitOrMiss(coords, trueTable);//update trueBoard
        enemy.gotAttacked = true;
        if(enemy.pBoard.allShipsSunk()){//      if this boards ships sunk then we lost...
            console.log("the winner is player "+ winner);
            this.clearGrid(trueTable);
            this.clearGrid(cpuHiddenTable);
            this.censorCurtainEnter();
            displayWinner(winner);
        }

    }

    cpuGameClickCell(playerHiddenBoardDOM, winner, enemy, enemyTrueBoard){//, playerTrueBoardDOM//this should update the hidden board and the true board at the same time
        let gbh = document.querySelector(playerHiddenBoardDOM);
        let hiddenTable = gbh.firstElementChild;
        let gbt = document.querySelector(enemyTrueBoard);
        let enemyTrueTable = gbt.firstElementChild;
        hiddenTable.addEventListener('click', (e) => {//listening for clicks on current players hiddenBoard
            if(e.target.tagName === 'TD'){
                const row = e.target.parentElement;//
                let cIndex = e.target.cellIndex;//
                let rIndex = row.rowIndex//get coords of cell
                if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){//if miss or hit
                    if(!(this.pBoard.allShipsSunk())){//      if this boards ships sunk then we lost...
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);//update hiddenBoard
                        if(this.pBoard.board[rIndex][cIndex] == "0"){
                            this.cpuPlayerAttacks(".player1Board",2, enemy, hiddenTable);
                        }
                    }else{
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);//update hiddenBoard
                        console.log("the winner is player "+ winner);
                        this.censorCurtainEnter();
                        this.clearGrid(hiddenTable);
                        this.clearGrid(enemyTrueTable);
                        displayWinner(winner);
                    }
                }
            }
        }
        );
    }

//write a similar method to clickCell that will handle computer attack choices
    clickCell(playerHiddenBoardDOM, playerTrueBoardDOM, enemyOldBoard, enemyNewBoard, winner){//this should update the hidden board and the true board at the same time
        let gbh = document.querySelector(playerHiddenBoardDOM);
        let hiddenTable = gbh.firstElementChild;
        let gbt = document.querySelector(playerTrueBoardDOM);
        let trueTable = gbt.firstElementChild;
        hiddenTable.addEventListener('click', (e) => {//listening for clicks on current players hiddenBoard
            if(e.target.tagName === 'TD'){
                const row = e.target.parentElement;//
                let cIndex = e.target.cellIndex;//
                let rIndex = row.rowIndex//get coords of cell
                console.log("clicked cell row: " + rIndex + " col: " + cIndex);
                if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){//if miss or hit
                    let shipsSunk = this.pBoard.allShipsSunk();
                    if(!(shipsSunk)){//      if this boards ships sunk then we lost...
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);//update hiddenBoard
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], trueTable);//update trueBoard
                        if(this.pBoard.board[rIndex][cIndex] == "0"){
                            this.censorCurtainEnter();
                            this.censorCurtainExit();//bring down curtain and exit
                            this.swapEnemyBoards(enemyOldBoard, enemyNewBoard);//swap the enemy boards(hidden and true)
                            this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);//swap our boards(hidden and true)
                        }
                        console.log("lollipop");
                    }else{
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);//update hiddenBoard
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], trueTable);
                        console.log("the winner is player "+ winner);
                        this.censorCurtainEnter();
                        this.clearGrid(hiddenTable);
                        this.clearGrid(trueTable);
                        let enemyOldTable = document.querySelector(enemyOldBoard);
                        let enemyNewTable = document.querySelector(enemyNewBoard);
                        this.clearGrid(enemyOldTable.firstElementChild);
                        this.clearGrid(enemyNewTable.firstElementChild);
                        displayWinner(winner);
                    }
                }
            }
        }
        );
    }
    displayShips(playerBoardDOM){
        // let gb = document.querySelector(playerBoardDOM);
        // let table = gb.firstElementChild;
        for(let i = 0; i < this.pBoard.board.length; i++){
            for(let j = 0; j < this.pBoard.board[i].length; j++){
                const row = playerBoardDOM.rows[i];//querySelector(`tr:nth-child(${i})`);
                const cell = row.cells[j];//querySelector(`td:nth-child(${j})`);
                if(this.pBoard.board[i][j] != undefined){//if theres a ship at these coords, display it
                    // const row = playerBoardDOM.rows[i]//querySelector(`tr:nth-child(${i})`);
                    // const cell = row.cells[j]//querySelector(`td:nth-child(${j})`);
                    cell.style.backgroundColor = "gray";
                    cell.style.borderRadius = "50px";
                }else{
                    cell.style.backgroundColor = "limegreen";
                    cell.style.borderRadius = "5px";
                }                
            }
        }
    }

    openBoard(playerBoardDOM){//html element is the param. Create a table/grid
        let gc = document.querySelector(playerBoardDOM);
    
        //fill grid with a table for easier access of each cell
        let table = document.createElement('table');
        for(let i = 0; i < this.pBoard.size; i++){
            let row = document.createElement('tr');
            for(let j = 0; j < this.pBoard.size; j++){
                let cell = document.createElement('td');
                cell.style.backgroundColor = "limegreen"; //REDUNDANT
                cell.style.borderRadius = "5px";
                row.appendChild(cell);
            } 
            table.appendChild(row);
        }
        gc.appendChild(table);
    }

    clearGrid(table){
        table.remove();
    }

    censorCurtainEnter(){
        let curtain = document.querySelector(".censorCurtain");
        curtain.style.animation = 'curtainEnter 1.8s forwards';
    }
    async consecutiveHit(enemy, coords, trueTable){
        await this.delay(700);
        enemy.pBoard.cpuHitOrMiss(coords, trueTable);//update trueBoard
    }
    async censorCurtainExit(){
        await this.delay(5000);
        let curtain = document.querySelector(".censorCurtain");
        curtain.style.animation = 'exitUp 1s forwards';
    }
    coordPickTimeDelay(enemy) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.cpuPicksCoords(enemy));
          }, 1000);
        });
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