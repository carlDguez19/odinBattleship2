import { shipTypeClicker, confirmAllShipsPlaced, acceptCoordInputs, cancelCoordsInput, playAgainReset, gameTypeSubmitListenerFunction } from "./listenerFuncs";

let listeners = [];

export function multShipsListener(player,enemy){
    let multShipsDiagram = document.querySelector(".shipsDiagram");
    let confirmShipsButton = document.querySelector(".confirmShip");
    multShipsDiagram.addEventListener('click', shipTypeClicker);
    listeners.push(() => multShipsDiagram.removeEventListener('click', shipTypeClicker));
    const wrapConfirmShipsPlaced = () => confirmAllShipsPlaced(player, enemy);
    confirmShipsButton.addEventListener('click', wrapConfirmShipsPlaced)
    listeners.push(() => confirmShipsButton.removeEventListener('click', wrapConfirmShipsPlaced));
}

export function coordsOverlayListener(player1,player2){//,hiddenTable,trueTable
    const shipCoordsSubmit = document.querySelector(".confirmCoords");
    const shipCoordsCancel = document.querySelector(".cancelCoords");
    const wrapAcceptCoordInputs = () => acceptCoordInputs(player1, player2);
    shipCoordsSubmit.addEventListener("click", wrapAcceptCoordInputs)
    listeners.push(() => shipCoordsSubmit.removeEventListener('click', wrapAcceptCoordInputs));
    shipCoordsCancel.addEventListener('click', cancelCoordsInput)
    listeners.push(() => shipCoordsCancel.removeEventListener('click', cancelCoordsInput));
}

export function playAgainButtonListener(p1,p2){
    const playAgainButton = document.querySelector(".playAgain");
    playAgainButton.addEventListener('click',playAgainReset)
    listeners.push(() => playAgainButton.removeEventListener('click', playAgainReset));
}

export function gameTypeListeners(){
    const gameTypesubmitButton = document.querySelector(".submitButton");
    gameTypesubmitButton.addEventListener('click', gameTypeSubmitListenerFunction);
    listeners.push(() => gameTypesubmitButton.removeEventListener('click', gameTypeSubmitListenerFunction));
}

export function setupCellClicker(hiddenTable, cellClickCallBack){
    hiddenTable.addEventListener('click', cellClickCallBack);
    listeners.push(() => hiddenTable.removeEventListener('click', cellClickCallBack));
}

export function removeListeners(){
    listeners.forEach(remove => remove());
    listeners = [];
}