import { xRadio, yRadio, xAxis, yAxis } from "./domElemConst";

export const delay = ms => new Promise(res => setTimeout(res, ms));
export function updateHitOrMiss(board,coords,table){//update table based on hit or miss(pvp only)
    if(board[coords[0]][coords[1]] == "0"){
        //update table cell to miss
        const row = table.rows[coords[0]+1];
        const cell = row.cells[coords[1]+1];
        cell.style.backgroundColor = "#BFD8C6";
    }else if(board[coords[0]][coords[1]] == "X"){
        //update ship to hit
        const row = table.rows[coords[0]+1];
        const cell = row.cells[coords[1]+1];
        cell.style.backgroundColor = "#F05D23";
        cell.style.borderRadius = "50px";
    }
}
export function cpuHitOrMiss(board,coords,table){//update table based on hit or miss(cpu only)
    if(board[coords[0]][coords[1]] == "0"){
        //update table cell to miss
        const row = table.rows[coords[0]+1];
        const cell = row.cells[coords[1]+1];
        cpuMissedCell(cell);
        //cell.style.backgroundColor = "teal";
    }else if(board[coords[0]][coords[1]] == "X"){
        //update ship to hit
        const row = table.rows[coords[0]+1];
        const cell = row.cells[coords[1]+1];
        cpuShipAttackedCell(cell);
    }
}

export function clearGrid(table){
    table.remove();
}

export function coordsOverlayReset(){//unccheck radios and reset select dropdowns
    xRadio.checked = false;
    yRadio.checked = false;
    xAxis.value = "0";
    yAxis.value = "0";
}

export function fadeIN(className){
    let element = document.querySelector(className);
    fadeINComplete(element);
}
export function fadeINComplete(element){
    element.classList.add('active');
}
export function fadeOUT(className){
    let element = document.querySelector(className);
    fadeOUTComplete(element);
}
export function fadeOUTComplete(element){
    element.classList.remove('active');
}

export function coordsOccupiedError(){//display error overlay for 2 seconds
    fadeIN('.coordsTakenOverlay');
    setTimeout(() => {
        fadeOUT('.coordsTakenOverlay');
    }, 2000);
}

export function censorCurtainEnter(){
    fadeIN('.censorCurtain');
}

export async function censorCurtainExit(){
    await delay(5000);
    fadeOUT('.censorCurtain');
}

export async function swapBoards(oldBoard, newBoard){
    await delay(500);
    fadeOUT(oldBoard);
    fadeIN(newBoard);
}
export async function swapEnemyBoards(oldBoardT, newBoardH){
    await delay(500);
    fadeOUT(oldBoardT);
    fadeIN(newBoardH);
}

export function displayShips(playerBoardDOM, player){
    for(let i = 0; i < player.pBoard.board.length; i++){
        for(let j = 0; j < player.pBoard.board[i].length; j++){
            const row = playerBoardDOM.rows[i +1];
            const cell = row.cells[j+1];
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

export function openBoard(playerBoardDOM, player){//generates the table for the players board
    let gc = document.querySelector(playerBoardDOM);
    let table = document.createElement('table');
    table.setAttribute('id', `${player.name}-board`);
    const letters = "ABCDEFGHIJ";
    let headerRow = document.createElement('tr');
    
    const cornerCell = document.createElement('td');//get letters ready as key for rows
    cornerCell.textContent = "";
    headerRow.appendChild(cornerCell);

    for(let j = 0; j < player.pBoard.size; j++){//get numbers ready as key for columns
        const colLabel = document.createElement('td');
        colLabel.textContent = j + 1;
        colLabel.style.fontweight = "bold";
        colLabel.style.textAlign = "center";
        colLabel.style.backgroundColor = "#6b9ac4";
        headerRow.appendChild(colLabel);
    }
    table.appendChild(headerRow);
    
    for(let i = 0; i < player.pBoard.size; i++){//setting up the rest of the table
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
    cell.style.backgroundColor = "#F05D23";
    cell.style.borderRadius = "50px";
}
async function cpuMissedCell(cell){
    await delay(700);
    cell.style.backgroundColor = "#BFD8C6";
}