import {v4 as uuidv4} from 'uuid';
interface Session { userId: string; sessionId: string; name: string; }
interface SessionResponseSchema { session: Session; }
export class SolveLogSessionsSchema {
    static toSchema({
                        session
                    }: SessionResponseSchema) {
        return {
            userId: {S: session.userId},
            sessionId: {S: session.sessionId ? session.sessionId : uuidv4()},
            name: {S: session.name},
        };
    }

    static fromSchema(dynamoDbResponse): Session[] {
        return dynamoDbResponse.map(response => ({
            sessionId: response.sessionId.S,
            userId: response.userId.S,
            name: response.name.S,
        }));
    }
}