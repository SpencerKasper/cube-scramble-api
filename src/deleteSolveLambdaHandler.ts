import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import {SolveLogSolvesSchema} from "./dynamo_db/schemas/solveLogSolvesSchema";

export const handler = async (event: any) => {
    try {
        const userId = decodeURIComponent(event.userId);
        const solveId = decodeURIComponent(event.solveId);
        if (!userId || !solveId) {
            return {responseCode: 400, body: {message: 'You must pass both "userId" and "solveId" to delete a solve.'}}
        }
        const dynamoDbClient = new DynamoDbClient('solve_log_solves');
        const deleteStatement = `DELETE FROM "solve_log_solves" WHERE "userId" = '${userId}' AND "solveId" = '${solveId}'`;
        console.error(`Delete Statement: ${deleteStatement}`);
        await dynamoDbClient.queryTable(deleteStatement);
        const selectStatement = `SELECT * FROM "solve_log_solves" WHERE "userId" = '${userId}'`;
        console.error(`Select Statement: ${selectStatement}`);
        const result = await dynamoDbClient.queryTable(selectStatement);
        const solves = SolveLogSolvesSchema.fromSchema(result.Items);
        return {responseCode: 200, body: {solves}};
    } catch (e) {
        return e;
    }
};