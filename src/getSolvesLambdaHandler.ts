import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        const userId = event.userId;
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        console.error(userId);
        const whereClause = userId ? ` WHERE "userId" = '${userId}'` : '';
        return dynamoDbClient.queryTable(`SELECT * FROM "solve_log_solves"${whereClause}`)
            .then(result => {
                console.error(result)
                const solves = SolveLogSolvesSchema.fromSchema(result.Items);
                return {responseCode: 200, body: {solves}};
            });
    } catch (e) {
        return e;
    }
};