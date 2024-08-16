import { Test, TestingModule } from '@nestjs/testing';
import { PredefinedQuestionDatabaseDynamodbLibService } from './predefined-question-database-lib.service';

describe('PredefinedQuestionDatabaseDynamodbLibService', () => {
    let service: PredefinedQuestionDatabaseDynamodbLibService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PredefinedQuestionDatabaseDynamodbLibService],
        }).compile();

        service = module.get<PredefinedQuestionDatabaseDynamodbLibService>(PredefinedQuestionDatabaseDynamodbLibService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
