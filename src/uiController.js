import { xRadio, yRadio, xAxis, yAxis } from "./domElemConst";
export const delay = ms => new Promise(res => setTimeout(res, ms));
export function updateHitOrMiss(board,coords,table){
    if(board[coords[0]][coords[1]] == "0"){
        //update table cell to miss
        const row = table.rows[coords[0]+1]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]+1]//querySelector(`td:nth-child(${j})`);
        cell.style.backgroundColor = "#BFD8C6";
    }else if(board[coords[0]][coords[1]] == "X"){
        //update ship to hit
        const row = table.rows[coords[0]+1]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]+1]//querySelector(`td:nth-child(${j})`);
        cell.style.backgroundColor = "#F05D23";
        cell.style.borderRadius = "50px";
    }
}
export function cpuHitOrMiss(board,coords,table){
    if(board[coords[0]][coords[1]] == "0"){
        //update table cell to miss
        const row = table.rows[coords[0]+1]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]+1]//querySelector(`td:nth-child(${j})`);
        cpuMissedCell(cell);
        //cell.style.backgroundColor = "teal";
    }else if(board[coords[0]][coords[1]] == "X"){
        //update ship to hit
        const row = table.rows[coords[0]+1]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]+1]//querySelector(`td:nth-child(${j})`);
        cpuShipAttackedCell(cell);
    }
}

export function clearGrid(table){
    table.remove();
}

export function coordsOverlayReset(){
    xRadio.checked = false;
    yRadio.checked = false;
    xAxis.value = "0";
    yAxis.value = "0";
}

export function coordsOccupiedError(){
    let coordError = document.querySelector('.coordsTakenOverlay');
    coordError.style.animation = "enterTop 1s forwards";
    setTimeout(() => {
        coordError.style.animation = "exitUp 1s forwards";
    }, 2000);
}

export function censorCurtainEnter(){
    let curtain = document.querySelector(".censorCurtain");
    curtain.style.animation = 'curtainEnter 1.3s forwards';
}

export async function censorCurtainExit(){
    await delay(5000);
    let curtain = document.querySelector(".censorCurtain");
    curtain.style.animation = 'curtainExit 1s forwards';
}

export async function swapBoards(oldBoard, newBoard){
        await delay(500);
        let oBoard = document.querySelector(oldBoard);
        let nBoard = document.querySelector(newBoard);
        oBoard.style.animation = 'exitUp 0.5s forwards';
        nBoard.style.animation = 'fadeIn 0.5s forwards';
    }
export async function swapEnemyBoards(oldBoard, newBoard){
    await delay(500);
    let oBoard = document.querySelector(oldBoard);
    let nBoard = document.querySelector(newBoard);
    oBoard.style.animation = 'fadeOut 0.5s forwards';
    nBoard.style.animation = 'enterTopBoard 0.5s forwards';
}

export function displayShips(playerBoardDOM, player){
    for(let i = 0; i < player.pBoard.board.length; i++){
        for(let j = 0; j < player.pBoard.board[i].length; j++){
            const row = playerBoardDOM.rows[i +1];//querySelector(`tr:nth-child(${i})`);
            const cell = row.cells[j+1];//querySelector(`td:nth-child(${j})`);
            if(player.pBoard.board[i][j] != undefined){//if theres a ship at these coords, display it
                cell.style.backgroundColor = "#2D305D"; //color for ship
                cell.style.borderRadius = "50px";
            }else{
                cell.style.backgroundColor = "#8FCB9B"; //default color for empty cell
                cell.style.borderRadius = "5px";
            }                
        }
    }
}

export function openBoard(playerBoardDOM, player){//html element is the param. Create a table/grid
    let gc = document.querySelector(playerBoardDOM);
    let table = document.createElement('table');//give table a id to later be able to delete
    table.setAttribute('id', `${player.name}-board`);
    console.log("table id: " + player.pBoard.id);
    const letters = "ABCDEFGHIJ";
    let headerRow = document.createElement('tr');
    
    const cornerCell = document.createElement('td');
    cornerCell.textContent = "";
    headerRow.appendChild(cornerCell);

    for(let j = 0; j < player.pBoard.size; j++){
        const colLabel = document.createElement('td');
        colLabel.textContent = j + 1;
        colLabel.style.fontweight = "bold";
        colLabel.style.textAlign = "center";
        colLabel.style.backgroundColor = "#6b9ac4";
        headerRow.appendChild(colLabel);
    }
    table.appendChild(headerRow);
    
    for(let i = 0; i < player.pBoard.size; i++){
        let row = document.createElement('tr');

        const rowLabel = document.createElement('td');
        rowLabel.textContent = letters[i];
        rowLabel.style.fontweight = "bold";
        rowLabel.style.textAlign = "center";
        rowLabel.style.backgroundColor = "#6b9ac4";
        row.appendChild(rowLabel);

        for(let j = 0; j < player.pBoard.size; j++){
            let cell = document.createElement('td');
            cell.style.backgroundColor = "#8FCB9B"; //REDUNDANT
            cell.style.borderRadius = "5px";
            row.appendChild(cell);
        } 
        table.appendChild(row);
    }
    gc.appendChild(table);
}

export async function consecutiveHit(enemy, coords, trueTable){
    cpuHitOrMiss(enemy.pBoard.board, coords, trueTable);//update trueBoard
}

async function cpuShipAttackedCell(cell){
    await delay(700);
    cell.style.backgroundColor = "F05D23";
    cell.style.borderRadius = "50px";
}
async function cpuMissedCell(cell){
    await delay(700);
    cell.style.backgroundColor = "#BFD8C6";
}