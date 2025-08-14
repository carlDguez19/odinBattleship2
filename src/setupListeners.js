import { shipTypeClicker, confirmAllShipsPlaced, acceptCoordInputs, cancelCoordsInput, playAgainReset, gameTypeSubmitListenerFunction } from "./listenerFuncs";
import { multShipsDiagram, confirmShipsButton, shipCoordsSubmit, shipCoordsCancel, playAgainButton, gameTypesubmitButton } from "./domElemConst";


let listeners = [];//setup all listeners here so they can be removed later

export function multShipsListener(player,enemy){
    multShipsDiagram.addEventListener('click', shipTypeClicker);
    listeners.push(() => multShipsDiagram.removeEventListener('click', shipTypeClicker));
    const wrapConfirmShipsPlaced = () => confirmAllShipsPlaced(player, enemy);
    confirmShipsButton.addEventListener('click', wrapConfirmShipsPlaced)
    listeners.push(() => confirmShipsButton.removeEventListener('click', wrapConfirmShipsPlaced));
}

export function coordsOverlayListener(player1,player2){
    const wrapAcceptCoordInputs = () => acceptCoordInputs(player1, player2);
    shipCoordsSubmit.addEventListener("click", wrapAcceptCoordInputs)
    listeners.push(() => shipCoordsSubmit.removeEventListener('click', wrapAcceptCoordInputs));
    shipCoordsCancel.addEventListener('click', cancelCoordsInput)
    listeners.push(() => shipCoordsCancel.removeEventListener('click', cancelCoordsInput));
}

export function playAgainButtonListener(p1,p2){
    playAgainButton.addEventListener('click',playAgainReset)
    listeners.push(() => playAgainButton.removeEventListener('click', playAgainReset));
}

export function gameTypeListeners(){
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