import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        const userId = decodeURIComponent(event.userId);
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const whereClause = userId ? ` WHERE "userId" = '${userId}'` : '';
        const result = await dynamoDbClient.queryTable(`SELECT * FROM "solve_log_solves"${whereClause}`);
        const solves = SolveLogSolvesSchema.fromSchema(result.Items);
        console.error(solves.find(solve => solve.solveId === '6d7b18b1-a5e8-4a5b-9b08-0a4c068b28a2'))
        return {responseCode: 200, body: {solves}};
    } catch (e) {
        return e;
    }
};