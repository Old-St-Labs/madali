import { AuthGuardLibModule } from '@auth-guard-lib';
import { AuthenticationServiceLibModule } from '@authentication-service-lib';
import { AwsSqsLibModule } from '@aws-sqs-lib';
import { CognitoLibModule } from '@cognito-lib';
import { CoreLibModule } from '@core-lib';
import { MessageQueueAwsSqsService, MessageQueueLibModule } from '@message-queue-lib';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';

@Module({
    controllers: [AuthenticationController],
    imports: [CoreLibModule,
        AuthGuardLibModule,
        CognitoLibModule,
        MessageQueueLibModule,
        AuthenticationServiceLibModule,
        AwsSqsLibModule],
    providers: [{
        provide: 'MessageQueueAwsSqsService',
        useClass: MessageQueueAwsSqsService,
    },],
})
export class AuthenticationModule { }
