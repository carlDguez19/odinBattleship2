import { shipTypeClicker, confirmAllShipsPlaced, acceptCoordInputs, cancelCoordsInput, playAgainReset, gameTypeSubmitListenerFunction } from "./setupListeners";
export function multShipsListener(player,enemy){
    let multShipsDiagram = document.querySelector(".shipsDiagram");
    let confirmShipsButton = document.querySelector(".confirmShip");
    multShipsDiagram.addEventListener('click', shipTypeClicker);
    const wrapConfirmShipsPlaced = () => confirmAllShipsPlaced(player, enemy);
    confirmShipsButton.addEventListener('click', wrapConfirmShipsPlaced)
}

export function coordsOverlayListener(player1,player2){//,hiddenTable,trueTable
    const shipCoordsSubmit = document.querySelector(".confirmCoords");
    const shipCoordsCancel = document.querySelector(".cancelCoords");
    const wrapAcceptCoordInputs = () => acceptCoordInputs(player1, player2);
    shipCoordsSubmit.addEventListener("click", wrapAcceptCoordInputs)
    shipCoordsCancel.addEventListener('click', cancelCoordsInput)
}

export function playAgainButtonListener(p1,p2){
    const playAgainButton = document.querySelector(".playAgain");
    playAgainButton.addEventListener('click',playAgainReset)
}

export function gameTypeListeners(){
    const gameTypesubmitButton = document.querySelector(".submitButton");
    gameTypesubmitButton.addEventListener('click', gameTypeSubmitListenerFunction);
}