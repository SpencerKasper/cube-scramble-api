import {RandomNumberGenerator} from "./RandomNumberGenerator";
import {Turn} from "./Turn";

const AXISES = ['X', 'Y', 'Z'];
const AXIS_FACE_MAP = {
    X: ['U', 'D'],
    Y: ['L', 'R'],
    Z: ['F', 'B'],
};
const FACE_TO_AXIS_MAP = {
    U: 'X',
    D: 'X',
    L: 'Y',
    R: 'Y',
    F: 'Z',
    B: 'Z',
};
type FaceValue = 'L' | 'R' | 'B' | 'D' | 'F' | 'U';
type Axis = 'X' | 'Y' | 'Z'

export class Face {
    private faceValue: FaceValue;
    private axis: Axis;

    constructor({faceValue, previousTurn}: { faceValue?: FaceValue, previousTurn?: Turn }) {
        this.faceValue = faceValue ? faceValue : this.generateRandomFaceValue(previousTurn);
        this.axis = FACE_TO_AXIS_MAP[faceValue] as Axis;
    }

    getFaceValue() {
        return this.faceValue;
    }

    getAxis() {
        return this.axis;
    }

    private generateRandomFaceValue = (previousTurn: Turn): FaceValue => {
        const randomAxisAsInt = RandomNumberGenerator.getRandomIntBetweenZeroAndNMinusOne(AXISES.length);
        const randomFaceForAxisAsInt = RandomNumberGenerator.getRandomIntBetweenZeroAndNMinusOne(2)
        const randomlySelectedFace = AXIS_FACE_MAP[AXISES[randomAxisAsInt] as Axis][randomFaceForAxisAsInt] as FaceValue;
        if (previousTurn && (previousTurn.getFace().getFaceValue() === randomlySelectedFace || previousTurn.getFace().getAxis() === FACE_TO_AXIS_MAP[randomlySelectedFace])) {
            return this.generateRandomFaceValue(previousTurn);
        }
        return randomlySelectedFace;
    };
}