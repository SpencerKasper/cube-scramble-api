import {TransactWriteItemsCommandInput} from "@aws-sdk/client-dynamodb";

const {DynamoDB} = require("@aws-sdk/client-dynamodb");

interface ReadManyArgs {
    primaryKeyName: string;
    sortKeyName: string;
    primaryAndSortValues: { primaryKey: string; sortKey: string; }[];
}

export class DynamoDbClient {
    tableName;
    client: typeof DynamoDB;

    constructor(tableName: string) {
        this.client = new DynamoDB({region: "us-east-1"});
        this.tableName = tableName
    }

    /*
        WARNING: This currently only supports strings for primary key and sort key.  It needs to be
        refactored if we want to support other types as well such as numbers.
     */
    async readMany({
                       primaryKeyName,
                       sortKeyName,
                       primaryAndSortValues
                   }: ReadManyArgs) {
        const keys = primaryAndSortValues.map(primaryAndSortValue => {
            return {
                [primaryKeyName]: {S: primaryAndSortValue.primaryKey},
                ...(sortKeyName && primaryAndSortValue.sortKey ? {[sortKeyName]: {S: primaryAndSortValue.sortKey}} : {}),
            };
        })
        const params = {
            ReturnConsumedCapacity: 'TOTAL',
            RequestItems: {
                [this.tableName]: {
                    Keys: keys
                }
            }
        }
        return this.client.batchGetItem(params);
    }

    async queryTable(statement) {
        return this.client.executeStatement({Statement: statement});
    }

    async writeMany(schemaObjects: any[]) {
        const putRequests = schemaObjects.map(schemaObject => ({PutRequest: {Item: schemaObject}}));
        const params = {
            ReturnConsumedCapacity: 'TOTAL',
            RequestItems: {
                [this.tableName]: putRequests
            }
        };
        await this.client.batchWriteItem(params);
    }

    async updateMany(params: TransactWriteItemsCommandInput) {
        return this.client.transactWriteItems(params);
    }
}