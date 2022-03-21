import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSessionsSchema} from "./dynamo_db/schemas/solveLogSessionsSchema";

export const handler = async (event: any) => {
    try {
        const userId = decodeURIComponent(event.userId);
        const dynamoDbClient = new DynamoDbClient('solve_log_sessions');
        const whereClause = userId ? ` WHERE "userId" = '${userId}'` : '';
        const result = await dynamoDbClient.queryTable(`SELECT * FROM "solve_log_sessions"${whereClause}`);
        if(result.Items) {
            const sessions = SolveLogSessionsSchema.fromSchema(result.Items);
            return {responseCode: 200, body: {sessions}};
        }
        return {responseCode: 404, body: {sessions: []}};
    } catch (e) {
        return e;
    }
};