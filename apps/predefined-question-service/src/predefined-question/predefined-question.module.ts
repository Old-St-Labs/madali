import { CoreLibModule } from '@core-lib';
import { Module } from '@nestjs/common';
import { PredefinedQuestionServiceLibModule } from '@predefined-question-service-lib';
import { PredefinedQuestionDynamoDbController } from './predefined-question.dynamodb.controller';

@Module({
    imports: [PredefinedQuestionServiceLibModule, CoreLibModule],
    controllers: [PredefinedQuestionDynamoDbController],
})
export class PredefinedQuestionModule { }
