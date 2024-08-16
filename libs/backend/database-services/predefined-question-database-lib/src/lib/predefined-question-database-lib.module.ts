import { DynamoDbLibModule } from '@dynamo-db-lib';
import { Module } from '@nestjs/common';
import { PredefinedQuestionDatabaseDynamodbLibService } from './predefined-question-database-lib.service';
@Module({
    imports: [DynamoDbLibModule],
    providers: [PredefinedQuestionDatabaseDynamodbLibService],
    exports: [PredefinedQuestionDatabaseDynamodbLibService],
})

export class PredefinedQuestionDatabaseDynamodbLibModule { }
