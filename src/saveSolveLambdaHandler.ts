import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";
import * as getSolvesLambdaHandler from './getSolvesLambdaHandler';

export const handler = async (event: any) => {
    try {
        const solve = event.body;
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const userIdSolve = {solve};
        await dynamoDbClient.writeMany([SolveLogSolvesSchema.toSchema(userIdSolve)]);
        return getSolvesLambdaHandler.handler({userId: solve.userId, sessionId: solve.sessionId});
    } catch (e) {
        return e;
    }
};