import { displayWinner, Gameboard, getMultOKClicked, setMultOKClicked } from "./gameboard";

export class Player{
    constructor(type){
        this.type = type;
        this.pBoard = new Gameboard();
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    cpuPicksCoords(enemy){
        //returns coords
        let coords = [];
        let attempts = 0;
        do{
            coords = [];
            console.log("upcoming coords:");
            for(let i = 0; i < 2; i++){
                let randInt = this.getRandomIntInclusive(0, 9);
                console.log("cpu picked coords: " + randInt);
                coords.push(randInt);
            }
            attempts++;
            if(attempts > 100){
                throw new Error("CPU attempts have exceeded safe limits. Logic is most likely broken.");
            }
        }while(!(enemy.pBoard.receiveAttack(coords, enemy.pBoard.board)));//while taken
        return coords;
    }
    cpuPicksShipsLocations(arr,cpu){
        for(let j = 0; j < arr.length; j++){
            let coords = [this.getRandomIntInclusive(0,9),this.getRandomIntInclusive(0,9)];
            let axis = this.getRandomIntInclusive(0,1);
            while(!cpu.pBoard.fitsOnBoard(arr[j].length, coords, axis)||!cpu.pBoard.coordsNotTaken(cpu.pBoard.board,coords,axis,arr[j].length)){
                coords = [this.getRandomIntInclusive(0,9),this.getRandomIntInclusive(0,9)];
                axis = this.getRandomIntInclusive(0,1);
            }
            cpu.pBoard.placeShip(arr[j].length,coords,axis,arr[j].id, cpu);//pass board as param????
            let p2gbt = document.querySelector(".player2Board");
            let tableFin = p2gbt.firstElementChild;
            cpu.displayShips(tableFin);
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
        //add logic to check if all ships sunk
        if(enemy.pBoard.allShipsSunk()){
            console.log("the winner is player "+ winner);
            this.clearGrid(cpuHiddenTable);
            this.clearGrid(trueTable);
            displayWinner(winner);
        }
    }

    clickCellCore({playerHiddenBoardDOM, playerTrueBoardDOM, enemyTrueBoard, enemyHiddenBoard, winner, enemy, gameType}){//, playerTrueBoardDOM//this should update the hidden board and the true board at the same time
        this.playerHiddenBoardDOM = playerHiddenBoardDOM;
        this.playerTrueBoardDOM = playerTrueBoardDOM;
        this.enemyTrueBoard = enemyTrueBoard;
        this.enemyHiddenBoard = enemyHiddenBoard;
        this.winner = winner;
        this.enemy = enemy;
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
        this.hiddenTable.addEventListener('click', this.cellClicker.bind(this));
    }
    cellClicker(e){
         if(e.target.tagName === 'TD' && getMultOKClicked() > 0){
                const row = e.target.parentElement;//
                let cIndex = e.target.cellIndex;//
                let rIndex = row.rowIndex//get coords of cell
                if(this.pBoard.receiveAttack([rIndex,cIndex],this.pBoard.board)){//if miss or hit
                    if(!(this.pBoard.allShipsSunk())){//      if this boards ships sunk then we lost...
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);//update hiddenBoard
                        if(gameType == "pvp"){
                            this.pBoard.updateHitOrMiss([rIndex,cIndex], trueTable);//update trueBoard %$%$%$$%$%$%$%
                        }
                        if(this.pBoard.board[rIndex][cIndex] == "0"){
                            if(gameType == "pvp"){
                                this.censorCurtainEnter();
                                this.censorCurtainExit();//bring down curtain and exit
                                this.swapEnemyBoards(enemyTrueBoard, enemyHiddenBoard);//swap the enemy boards(hidden and true)
                                this.swapBoards(playerHiddenBoardDOM, playerTrueBoardDOM);//swap our boards(hidden and true)
                            }else{
                                this.cpuPlayerAttacks(".player1Board",2, enemy, hiddenTable);
                                return;
                            }
                        }
                    }
                    else{
                        this.pBoard.updateHitOrMiss([rIndex,cIndex], hiddenTable);//update hiddenBoard
                        if(gameType == "pvp"){
                            this.pBoard.updateHitOrMiss([rIndex,cIndex], trueTable);//$%$%$%$%$%$%$%$
                            let enemyOldTable = document.querySelector(enemyTrueBoard);
                            let enemyNewTable = document.querySelector(enemyHiddenBoard);
                            this.clearGrid(enemyOldTable.firstElementChild);
                            this.clearGrid(enemyNewTable.firstElementChild);
                        }
                        this.clearGrid(hiddenTable);
                        this.clearGrid(trueTable);
                        //setMultOKClicked(0);
                        displayWinner(winner);

                    }
                }
            }
    }

    displayShips(playerBoardDOM){
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
        let table = document.createElement('table');//give table a id to later be able to delete
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
        //await this.delay(700);//might not be needed
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
        nBoard.style.animation = 'enterTopBoard 0.5s forwards';
    }
}