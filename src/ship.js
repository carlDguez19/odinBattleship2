export class Ship{
    constructor(length,id,coords,axis){//maybe include an if statement to check length is not 0
        if(length == 0){
            return NaN;
        }
        this.length = length;
        this.hits = 0;
        this.id = id;
        this.cdnts = coords;
        this.axis = axis;
    }

    hit(){
        return this.hits++;
    }

    isSunk(){
        if(this.hits >= this.length){
            return true;
        }
        return false;
    }
}