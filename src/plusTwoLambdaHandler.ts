import {DynamoDB} from "@aws-sdk/client-dynamodb";
import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import * as getSolvesLambdaHandler from './getSolvesLambdaHandler';

export const handler = async (event) => {
  try {
      const userId = decodeURIComponent(event.userId);
      const dynamoDbClient = new DynamoDbClient('solve_log_solves');
      const params = {
          TransactItems: [
              {
                  Update: {
                      ExpressionAttributeNames: {
                          "#TIME": "time"
                      },
                      ExpressionAttributeValues: {
                          ":t": {
                              N: "2000"
                          }
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
                      UpdateExpression: 'SET #TIME = #TIME + :t',
                  }
              },
          ],
      };
      const transactWriteItemsCommandOutput = await dynamoDbClient.updateMany(params);
      return getSolvesLambdaHandler.handler(event);
  }  catch (e) {
      return e;
  }
};