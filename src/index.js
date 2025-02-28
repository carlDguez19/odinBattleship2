import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

//here we will have the flow of the game...
//game setup
//ask how many ships per board
//ask if player is real or computer.
//if real then prompt player for coords of ships and place them
//else generate random coords for ships and place them(all of this in a method in gameboard???)
//start gameloop
//each player takes turn choosing a coord until either of the players allShipsSunk

const player1 = new Player("real", 10);
const player2 = new Player("real", 10);

player1.pBoard.placeShip(3,[2,3],1);
player1.pBoard.placeShip(2,[0,1],0);
player1.pBoard.placeShip(2,[2,0],0);
player1.pBoard.placeShip(4,[9,6],0);player1.pBoard.placeShip(5,[3,8],1);

player2.pBoard.placeShip(3,[1,2],0);
player2.pBoard.placeShip(2,[2,1],1);
player2.pBoard.placeShip(2,[3,3],1);
player2.pBoard.placeShip(4,[9,3],0);
player2.pBoard.placeShip(5,[3,5],1);

player1.openBoard(".player1Board");
player2.openBoard(".player2Board");
player1.openBoard(".player1HiddenBoard");
player2.openBoard(".player2HiddenBoard");

player1.displayShips(".player1Board");
player2.displayShips(".player2Board");

player2.turnTook = true;

while(!player1.pBoard.allShipsSunk() && !player2.pBoard.allShipsSunk()){
    console.log("mede it here");
    // if(!player1.turnTook){
    //     while(!player1.turnTook){
    //         if(player2.clickCell(".player2HiddenBoard", ".player2Board")){
    //             player1.turnTook = true;
    //             player2.turnTook = false;
    //             player1.swap1Boards(".player1Board",".player1HiddenBoard");
    //         }
    //     }
    // }
    // else if(!player2.turnTook){
    //     while(!player2.turnTook){
    //         if(player1.clickCell(".player1HiddenBoard", ".player1Board")){
    //             player2.turnTook = true;
    //             player1.turnTook = false;
    //             player2.swap2Boards(".player2Board",".player2HiddenBoard");
    //         }
    //     }
    // }
}

//i will need a function or method in one of these files that determines the currentTurn(influenced by tictactoe)
//player1.clickCell(".player1HiddenBoard", ".player1Board");
//player2.clickCell(".player2HiddenBoard", ".player2Board");