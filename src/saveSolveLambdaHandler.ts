import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        const userId = event.userId;
        const body = JSON.parse(event.body);
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const userIdSolve = {userId, solve: body.solve};
        await dynamoDbClient.writeMany([SolveLogSolvesSchema.toSchema(userIdSolve)])
        return {responseCode: 200, body: userIdSolve};
    } catch (e) {
        return e;
    }
};