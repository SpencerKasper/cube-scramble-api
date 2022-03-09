import {Turn} from "./Turn";

export class Scramble {
    private scramble: Turn[] = [];
    private readonly scrambleLength: number;

    constructor(length: number) {
        this.scrambleLength = length;
    }

    generate() {
        this.scramble = [];
        for (let index = 0; index < this.scrambleLength; index++) {
            const previousTurn = index === 0 || this.scramble.length === 0 ? null : this.scramble[index - 1];
            this.scramble.push(new Turn(previousTurn));
        }
        return this.toString();
    }

    toString() {
        if (this.scramble.length === 0) {
            console.error('No scramble existed.  Generating new scramble...');
            this.generate();
        }
        return this.scramble.reduce((acc, curr) => {
            return `${acc}${curr.toString()} `;
        }, '');
    }
}