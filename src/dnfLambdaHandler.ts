import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import * as getSolvesLambdaHandler from './getSolvesLambdaHandler';

export const handler = async (event) => {
  try {
      const userId = decodeURIComponent(event.userId);
      const isDnf = event.isDnf === 'false' ? false : true;
      const dynamoDbClient = new DynamoDbClient('solve_log_solves');
      const params = {
          TransactItems: [
              {
                  Update: {
                      ExpressionAttributeNames: {
                          "#DNF": "dnf",
                      },
                      ExpressionAttributeValues: {
                          ":t": {
                              BOOL: isDnf
                          },
                      },
                      Key: {
                          'solveId': {
                              S: event.solveId,
                          },
                          'userId': {
                              S: userId,
                          }
                      },
                      TableName: 'solve_log_solves',
                      UpdateExpression: `SET #DNF = :t`,
                  }
              },
          ],
      };
      await dynamoDbClient.updateMany(params);
      return getSolvesLambdaHandler.handler(event);
  }  catch (e) {
      return e;
  }
};