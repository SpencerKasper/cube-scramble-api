import {DynamoDB} from "@aws-sdk/client-dynamodb";
import {DynamoDbClient} from "./dynamo_db/dynamoDbClient";
import * as getSolvesLambdaHandler from './getSolvesLambdaHandler';

export const handler = async (event) => {
  try {
      if(!event.userId) {
          return {responseCode: 400, body: {solves: []}};
      }
      const userId = decodeURIComponent(event.userId);
      const plusOrMinusTwo = event.plusOrMinusTwo ? event.plusOrMinusTwo : '+'
      const dynamoDbClient = new DynamoDbClient('solve_log_solves');
      const params = {
          TransactItems: [
              {
                  Update: {
                      ExpressionAttributeNames: {
                          "#TIME": "time",
                      },
                      ExpressionAttributeValues: {
                          ":t": {
                              N: "2000"
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
                      UpdateExpression: `SET #TIME = #TIME ${plusOrMinusTwo} :t`,
                  }
              },
          ],
      };
      await dynamoDbClient.updateMany(params);
      const paramsPlusTwoUpdate = {
          TransactItems: [
              {
                  Update: {
                      ExpressionAttributeNames: {
                          "#PLUSTWO": "plusTwo"
                      },
                      ExpressionAttributeValues: {
                          ":p": {
                              BOOL: plusOrMinusTwo === '+'
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
                      UpdateExpression: 'SET #PLUSTWO = :p',
                  }
              },
          ],
      };
      await dynamoDbClient.updateMany(paramsPlusTwoUpdate);
      return getSolvesLambdaHandler.handler(event);
  }  catch (e) {
      return e;
  }
};