import { AuthGuardLibModule } from '@auth-guard-lib';
import { AwsSqsLibModule } from '@aws-sqs-lib';
import { CognitoLibModule } from '@cognito-lib';
import { CoreLibModule } from '@core-lib';
import { MessageQueueAwsSqsService, MessageQueueLibModule } from '@message-queue-lib';
import { Module } from '@nestjs/common';
import { UserDatabaseDynamodbLibModule } from '@user-database-dynamodb-lib';
import { UserServiceDynamoLibService, UserServiceLibModule } from '@user-service-lib';
import { UserDynamoDbController } from './user.dynamodb.controller';

@Module({
    imports: [
        CoreLibModule,
        AuthGuardLibModule,
        UserServiceLibModule,
        CognitoLibModule,
        UserDatabaseDynamodbLibModule,
        MessageQueueLibModule,
        AwsSqsLibModule
    ],
    controllers: [UserDynamoDbController],
    providers: [


        {
            provide: 'UserServiceDynamoLibService',
            useClass: UserServiceDynamoLibService,
        },
        {
            provide: 'MessageQueueAwsSqsService',
            useClass: MessageQueueAwsSqsService,
        },
    ],
})
export class UserModule { }
