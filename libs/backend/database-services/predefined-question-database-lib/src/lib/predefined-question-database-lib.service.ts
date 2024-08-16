import { CreatePredefinedQuestionDto, UpdatePredefinedQuestionDto } from '@dto';
import { DynamoDbService, PredefinedQuestionDataType } from '@dynamo-db-lib';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PredefinedQuestionDatabaseDynamodbLibService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private predefinedQuestionTable: any = null;
    
    private readonly logger = new Logger(PredefinedQuestionDatabaseDynamodbLibService.name);

    constructor(private readonly dynamoDbService: DynamoDbService) {
        this.predefinedQuestionTable = this.dynamoDbService.dynamoDbMainTable().getModel('PredefinedQuestion');
    }

    async findAll(): Promise<PredefinedQuestionDataType[]> {
        const dbStats = {};
        
        const predefinedQuestions: PredefinedQuestionDataType[] = await this.predefinedQuestionTable.scan({}, {
            stats: dbStats
        });

        this.logger.log(`Predefined Question Table Scan Query stats: ${JSON.stringify(dbStats)}`);

        return predefinedQuestions;
    }

    async createRecord(predefinedQuestionData: CreatePredefinedQuestionDto): Promise<PredefinedQuestionDataType> {
        const dbStats = {};
        
        const predefinedQuestion: PredefinedQuestionDataType = {
            question: predefinedQuestionData.question,
            questionType: predefinedQuestionData.questionType,
            GSI2PK: predefinedQuestionData.questionType.startsWith('PREDEFINED_QUESTION#')
                ? predefinedQuestionData.questionType
                : 'PREDEFINED_QUESTION#' + predefinedQuestionData.questionType
        };

        const predefinedQuestionRecord: PredefinedQuestionDataType = await this.predefinedQuestionTable.create(predefinedQuestion, {
            stats: dbStats
        });

        this.logger.log(`Predefined Question Table Create Query stats: ${JSON.stringify(dbStats)}`);

        return predefinedQuestionRecord;
    }

    async updateRecord(predefinedQuestionData: UpdatePredefinedQuestionDto): Promise<PredefinedQuestionDataType> {
        const dbStats = {};
        
        const updatedPredefinedQuestionData = {
            ...predefinedQuestionData,
            ...(predefinedQuestionData.questionType && {
                GSI2PK: predefinedQuestionData.questionType.startsWith('PREDEFINED_QUESTION#')
                    ? predefinedQuestionData.questionType
                    : 'PREDEFINED_QUESTION#' + predefinedQuestionData.questionType
            })
        };
        
        const updatedPredefinedQuestionRecord: PredefinedQuestionDataType = await this.predefinedQuestionTable.update(updatedPredefinedQuestionData, {
            stats: dbStats
        });

        this.logger.log(`Predefined Question Table Update Query stats: ${JSON.stringify(dbStats)}`);

        return updatedPredefinedQuestionRecord;
    }

    async deleteRecordById(predefinedQuestionId: string): Promise<void> {
        const dbStats = {};
        
        await this.predefinedQuestionTable.deleteItem({
            predefinedQuestionId: predefinedQuestionId
        } as PredefinedQuestionDataType, {
            stats: dbStats
        });

        this.logger.log(`Predefined Question Table Delete Query stats: ${JSON.stringify(dbStats)}`);
    }

    async findById(predefinedQuestionId: string): Promise<PredefinedQuestionDataType> {
        const dbStats = {};

        const predefinedQuestionRecord: PredefinedQuestionDataType = await this.predefinedQuestionTable.get({
            predefinedQuestionId: predefinedQuestionId,
        } as PredefinedQuestionDataType, {
            stats: dbStats
        });

        this.logger.log(`Predefined Question Table Find By Id Query stats: ${JSON.stringify(dbStats)}`);

        return predefinedQuestionRecord;
    }

    async findByQuestion(question: string): Promise<PredefinedQuestionDataType> {
        const dbStats = {};

        const predefinedQuestionRecord: PredefinedQuestionDataType = await this.predefinedQuestionTable.get({
            question: question
        } as PredefinedQuestionDataType, {
            stats: dbStats
        });

        this.logger.log(`Predefined Question Table Find By Question Query stats: ${JSON.stringify(dbStats)}`);

        return predefinedQuestionRecord;
    }

}