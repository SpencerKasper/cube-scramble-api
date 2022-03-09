import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        const userId = event.userId;
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const whereClause = userId ? ` WHERE "userId" = '${userId}'` : '';
        const result = await dynamoDbClient.queryTable(`SELECT * FROM "solve_log_solves"${whereClause}`);
        console.error(result)
        return {responseCode: 200, body: SolveLogSolvesSchema.fromSchema(result.Items)};
    } catch (e) {
        return e;
    }
};