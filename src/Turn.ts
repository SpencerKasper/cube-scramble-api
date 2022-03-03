import {Face} from "./Face";
import {Direction} from "./Direction";

export class Turn {
    private face: Face;
    private direction: Direction;

    constructor(previousTurn: Turn) {
        this.face = new Face({previousTurn});
        this.direction = new Direction();
    }

    getFace = (): Face => {
        return this.face;
    };

    getDirection = (): Direction => {
        return this.direction;
    }

    toString() {
        return `${this.getFace().getFaceValue()}${this.getDirection().getDirectionValue()}`
    }
}