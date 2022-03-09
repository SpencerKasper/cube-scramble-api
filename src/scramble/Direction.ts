import {RandomNumberGenerator} from "./RandomNumberGenerator";

type DirectionValue = '' | '\'' | '2';
const DIRECTION_VALUES: DirectionValue[] = ['', '\'', '2']

export class Direction {
    private directionValue: DirectionValue;

    constructor(directionValue?: DirectionValue) {
        this.directionValue = directionValue ? directionValue : Direction.generateRandomDirectionValue();
    }

    getDirectionValue() {
        return this.directionValue;
    }

    private static generateRandomDirectionValue(): DirectionValue {
        const randomIndexOfDirectionValue = RandomNumberGenerator.getRandomIntBetweenZeroAndNMinusOne(DIRECTION_VALUES.length);
        return DIRECTION_VALUES[randomIndexOfDirectionValue]
    }
}