import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {DEFAULT_SESSION_ID, SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        if (!event.userId) {
            return {responseCode: 400, body: {solves: []}, message: 'Must have userId in query string'};
        }
        if (!event.sessionId) {
            return {responseCode: 400, body: {solves: []}, message: 'Must have sessionId in query string'};
        }
        const userId = decodeURIComponent(event.userId);
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const whereClause = ` WHERE "userId" = '${userId}'`;
        const whereClauseWithSessionId = event.sessionId ? `${whereClause} AND ("sessionId" = '${event.sessionId}'` : whereClause;
        const whereClauseWithEmptySessionIds = event.sessionId && event.sessionId === DEFAULT_SESSION_ID ? `${whereClauseWithSessionId} OR "sessionId" IS MISSING)` : `${whereClauseWithSessionId}`;
        const sqlStatement = !whereClauseWithEmptySessionIds.endsWith(')') ? `SELECT * FROM "solve_log_solves"${whereClauseWithEmptySessionIds})` : `SELECT * FROM "solve_log_solves"${whereClauseWithEmptySessionIds}`;
        console.error(`GetSolvesLambdaHandler - SQL Statement - ${sqlStatement}`);
        const result = await dynamoDbClient.queryTable(sqlStatement);
        const solves = SolveLogSolvesSchema.fromSchema(result.Items);
        return {responseCode: 200, body: {solves}};
    } catch (e) {
        return e;
    }
};