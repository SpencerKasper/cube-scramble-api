import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        if(!event.userId) {
            return {responseCode: 400, body: {solves: []}};
        }
        const userId = decodeURIComponent(event.userId);
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const whereClause = userId ? ` WHERE "userId" = '${userId}'` : '';
        const whereClauseWithSessionId = event.sessionId ? `${whereClause} AND "sessionId" = '${event.sessionId}'` : whereClause;
        const result = await dynamoDbClient.queryTable(`SELECT * FROM "solve_log_solves"${whereClauseWithSessionId}`);
        const solves = SolveLogSolvesSchema.fromSchema(result.Items);
        return {responseCode: 200, body: {solves}};
    } catch (e) {
        return e;
    }
};