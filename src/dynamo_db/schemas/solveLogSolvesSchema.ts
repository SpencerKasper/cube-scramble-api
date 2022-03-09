import {v4 as uuidv4} from 'uuid';

interface SolveResponseSchema { userId: string; solve: { scramble: string; time: number; solveId: string; cubeType: string; number: number }; }
export class SolveLogSolvesSchema {
    static toSchema({
                        userId,
                        solve
                    }: SolveResponseSchema) {
        return {
            userId: {S: userId},
            solveId: {S: solve.solveId ? solve.solveId : uuidv4()},
            scramble: {S: solve.scramble},
            time: {N: solve.time.toString()},
            cubeType: {S: solve.cubeType},
            number: {N: solve.number.toString()},
        };
    }

    static fromSchema(dynamoDbResponse): SolveResponseSchema {
        return dynamoDbResponse.map(response => ({
            solveId: response.solveId.S,
            userId: response.userId.S,
            scramble: response.scramble.S,
            time: Number(response.time.N),
            cubeType: response.cubeType.S,
            number: Number(response.number.N),
        }));
    }
}