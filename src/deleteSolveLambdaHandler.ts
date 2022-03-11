import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        const userId = event.userId;
        const solveId = event.solveId;
        if(!userId || !solveId) {
            return {responseCode: 400, body: {message: 'You must pass both "userId" and "solveId" to delete a solve.'}}
        }
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const whereClause = userId ? ` WHERE "userId" = '${userId}'` : '';
        await dynamoDbClient.queryTable(`DELETE FROM "solve_log_solves" ${whereClause} WHERE "userId" = '${userId}' AND "solveId" = '${solveId}'`);
        const result = await dynamoDbClient.queryTable(`SELECT * FROM "solve_log_solves" WHERE "userId" = '${userId}'`);
        const solves = SolveLogSolvesSchema.fromSchema(result.Items);
        return {responseCode: 200, body: {solves}};
    } catch (e) {
        return e;
    }
};