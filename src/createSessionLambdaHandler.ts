import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSessionsSchema} from "./dynamo_db/schemas/solveLogSessionsSchema";
import * as getSolvesLambdaHandler from './getSessionsLambdaHandler';

export const handler = async (event: any) => {
    try {
        const session = event.body;
        const dynamoDbClient = new DynamoDbClient('solve_log_sessions');
        const userIdSolve = {session};
        let schemaObjects = [SolveLogSessionsSchema.toSchema(userIdSolve)];
        await dynamoDbClient.writeMany(schemaObjects);
        return getSolvesLambdaHandler.handler({userId: session.userId});
    } catch (e) {
        return e;
    }
};