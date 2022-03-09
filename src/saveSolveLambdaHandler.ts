import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        console.error(event);
        const body = JSON.parse(event.body);
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const userIdSolve = {solve: body.solve};
        await dynamoDbClient.writeMany([SolveLogSolvesSchema.toSchema(userIdSolve)])
        return {responseCode: 200, body: userIdSolve, headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }};
    } catch (e) {
        return e;
    }
};