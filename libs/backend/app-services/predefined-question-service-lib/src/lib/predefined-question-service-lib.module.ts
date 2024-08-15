import { Module } from '@nestjs/common';
import { PredefinedQuestionDatabaseDynamodbLibModule } from '@predefined-question-database-lib';
import { PredefinedQuestionServiceDynamoLibService } from './predefined-question-service-lib.service';

@Module({
    imports: [PredefinedQuestionDatabaseDynamodbLibModule],
    providers: [PredefinedQuestionServiceDynamoLibService],
    exports: [PredefinedQuestionServiceDynamoLibService],
})
export class PredefinedQuestionServiceLibModule { }
