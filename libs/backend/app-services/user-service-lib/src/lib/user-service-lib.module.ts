import { AwsSqsLibModule } from '@aws-sqs-lib';
import { MessageQueueLibModule } from '@message-queue-lib';
import { Module } from '@nestjs/common';
import { UserDatabaseDynamodbLibModule } from '@user-database-dynamodb-lib';
import { UserServiceDynamoLibService } from './user-service-dynamo-lib.service';

@Module({
    imports: [UserDatabaseDynamodbLibModule, MessageQueueLibModule, AwsSqsLibModule],
    providers: [
        UserServiceDynamoLibService
    ],
    exports: [UserServiceDynamoLibService
    ],
})
export class UserServiceLibModule { }

