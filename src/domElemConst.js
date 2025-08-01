//overlays
export const winnerOverlay = document.querySelector(".winnerOverlay");//let
export const multShipsMovement = document.querySelector(".multShipsPlacementOverlay");//let
export const gameTypeOverlay = document.querySelector(".playerSelectionOverlay");
export const shipCoordsOverlay = document.querySelector(".shipInputsOverlay");

//gameType selction
export const pvp = document.querySelector(".pvp");
export const pve = document.querySelector(".pve");

//coords for ship placing
export const xAxis = document.querySelector(".xAxis");
export const yAxis = document.querySelector(".yAxis");
export const xRadio = document.querySelector(".xRadio");
export const yRadio = document.querySelector(".yRadio");

let multShipSize = 0;//used for size of each ship to be placed
export function getMultShipSize(){
    return multShipSize;
}
export function setMultShipSize(val){
    multShipSize = val;
}

let multOKClicked = 0;//used to determine if ships have been placed
export function getMultOKClicked(){
    return multOKClicked;
}
export function setMultOKClicked(val){
    multOKClicked = val;
}