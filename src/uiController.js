export const delay = ms => new Promise(res => setTimeout(res, ms));
export function updateHitOrMiss(board,coords,table){
    if(board[coords[0]][coords[1]] == "0"){
        //update table cell to miss
        const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
        cell.style.backgroundColor = "teal";
    }else if(board[coords[0]][coords[1]] == "X"){
        //update ship to hit
        const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
        cell.style.backgroundColor = "darkred";
        cell.style.borderRadius = "50px";
    }
}
export function cpuHitOrMiss(board,coords,table){
    if(board[coords[0]][coords[1]] == "0"){
        //update table cell to miss
        const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
        cpuMissedCell(cell);
        //cell.style.backgroundColor = "teal";
    }else if(board[coords[0]][coords[1]] == "X"){
        //update ship to hit
        const row = table.rows[coords[0]]//querySelector(`tr:nth-child(${i})`);
        const cell = row.cells[coords[1]]//querySelector(`td:nth-child(${j})`);
        cpuShipAttackedCell(cell);
    }
}

export function clearGrid(table){
    table.remove();
}

async function cpuShipAttackedCell(cell){
    await delay(700);
    cell.style.backgroundColor = "darkred";
    cell.style.borderRadius = "50px";
}
async function cpuMissedCell(cell){
    await delay(700);
    cell.style.backgroundColor = "teal";
}