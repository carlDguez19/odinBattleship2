export const winnerOverlay = document.querySelector(".winnerOverlay");//let
export const multShipsMovement = document.querySelector(".multShipsPlacementOverlay");//let
export const pvp = document.querySelector(".pvp");
export const pve = document.querySelector(".pve");
export const shipCoordsOverlay = document.querySelector(".shipInputsOverlay");
export const xAxis = document.querySelector(".xAxis");
export const yAxis = document.querySelector(".yAxis");
export const xRadio = document.querySelector(".xRadio");
export const yRadio = document.querySelector(".yRadio");
export const gameTypeOverlay = document.querySelector(".playerSelectionOverlay");

 let multShipSize = 0;
export function getMultShipSize(){
    return multShipSize;
}
export function setMultShipSize(val){
    multShipSize = val;
}

let multOKClicked = 0;
export function getMultOKClicked(){
    return multOKClicked;
}
export function setMultOKClicked(val){
    multOKClicked = val;
}