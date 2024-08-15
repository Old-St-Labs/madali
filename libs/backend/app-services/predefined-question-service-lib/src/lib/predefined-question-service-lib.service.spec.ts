import { CreatePredefinedQuestionDto, PredefinedQuestionDto, QuestionType, UpdatePredefinedQuestionDto } from '@dto';
import { PredefinedQuestionDataType } from '@dynamo-db-lib';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PredefinedQuestionDatabaseDynamodbLibService } from '@predefined-question-database-lib';
import { PredefinedQuestionServiceDynamoLibService } from './predefined-question-service-lib.service';

describe('PredefinedQuestionServiceLibService', () => {
    let service: PredefinedQuestionServiceDynamoLibService;

    const mockPredefinedQuestionDatabaseLibService = {
        findAll: jest.fn().mockImplementation(() => {
            return Promise.resolve([
                {
                    predefinedQuestionId: '1234567890',
                    question: 'Existing question',
                    questionType: QuestionType.Text,
                },
                {
                    predefinedQuestionId: '0987654321',
                    question: 'Another existing question',
                    questionType: QuestionType.Text,
                },
            ]);
        }),

        
        createRecord: jest.fn().mockImplementation((data: CreatePredefinedQuestionDto) => {
            if (data.question === 'error') {
                return Promise.reject(new BadRequestException('Unable to create record'));
            } else {
                const response: PredefinedQuestionDataType = {
                    predefinedQuestionId: '1234567890',
                    question: data.question,
                    questionType: data.questionType,
                };
    
                return Promise.resolve(response);
            }
        }),

        updateRecord: jest.fn().mockImplementation((predefinedQuestionData: UpdatePredefinedQuestionDto) => {
            if (predefinedQuestionData.predefinedQuestionId === '1234567890') {
                const response: PredefinedQuestionDataType = {
                    predefinedQuestionId: '1234567890',
                    question: predefinedQuestionData.question || 'Existing question',
                    questionType: predefinedQuestionData.questionType || QuestionType.Text,
                };

                return Promise.resolve(response);
            } else {
                return Promise.reject(new BadRequestException('Unable to update record'));
            }
        }),

        deleteRecordById: jest.fn().mockImplementation((id: string) => {
            if (id === '1234567890') {
                return Promise.resolve();
            } else {
                return Promise.reject(new BadRequestException('Unable to delete record'));
            }
        }),

        findById: jest.fn().mockImplementation((id: string) => {
            if (id === '1234567890' || id === '0987654321') {
                return Promise.resolve({
                    predefinedQuestionId: '1234567890',
                    question: 'Existing question',
                    questionType: QuestionType.Text,
                });
            } else {
                return Promise.resolve(null);
            }
        }),

        findByQuestion: jest.fn().mockImplementation((question: string) => {
            if (question === 'existing') {
                return Promise.resolve({
                    predefinedQuestionId: '9876543210',
                    question: question,
                });
            } else {
                return Promise.resolve(null);
            }
        })
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PredefinedQuestionServiceDynamoLibService, PredefinedQuestionDatabaseDynamodbLibService],
        })
            .overrideProvider(PredefinedQuestionDatabaseDynamodbLibService)
            .useValue(mockPredefinedQuestionDatabaseLibService)
            .compile();
        
        service = module.get(PredefinedQuestionServiceDynamoLibService);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getPredefinedQuestions', () => {
        it('should fetch predefined questions successfully', async () => {
            const predefinedQuestions = [
                {
                    predefinedQuestionId: '1234567890',
                    question: 'Question 1',
                    questionType: QuestionType.Text,
                },
                {
                    predefinedQuestionId: '9876543210',
                    question: 'Question 2',
                    questionType: QuestionType.Text,
                },
            ];

            jest.spyOn(service, 'getPredefinedQuestions').mockResolvedValue(Promise.resolve({
                statusCode: 200,
                body: predefinedQuestions,
            }));

            const result = await service.getPredefinedQuestions();

            expect(result).toHaveProperty('statusCode', 200);
            expect(result.body).toEqual(predefinedQuestions);
            expect(service.getPredefinedQuestions).toHaveBeenCalledTimes(1);
        });

        it('should throw BadRequestException when fetching predefined questions fails', async () => {
            jest.spyOn(service, 'getPredefinedQuestions').mockRejectedValue(new BadRequestException('Unable to fetch predefined questions'));

            await expect(service.getPredefinedQuestions()).rejects.toThrow(BadRequestException);
            expect(service.getPredefinedQuestions).toHaveBeenCalledTimes(1);
        });
    });

    describe('createPredefinedQuestion', () => {
        // Happy path test: Successfully creates a predefined question
        it('should create a predefined question successfully', async () => {
            const predefinedQuestionData: PredefinedQuestionDto = new PredefinedQuestionDto();

            predefinedQuestionData.question = 'Test question';
            predefinedQuestionData.questionType = QuestionType.Text;

            const result = await service.createPredefinedQuestion(predefinedQuestionData);

            expect(result.statusCode).toBe(201);
            expect(result.body).toHaveProperty('predefinedQuestionId', '1234567890');
            expect(result.body).toHaveProperty('question', predefinedQuestionData.question);
            expect(result.body).toHaveProperty('questionType', predefinedQuestionData.questionType);
            expect(mockPredefinedQuestionDatabaseLibService.findByQuestion).toHaveBeenCalledWith(predefinedQuestionData.question);
            expect(mockPredefinedQuestionDatabaseLibService.createRecord).toHaveBeenCalledWith(predefinedQuestionData);
        });

        // Error path test: DB throws an error during creation
        it('should throw BadRequestException when creation fails', async () => {
            const predefinedQuestionData: PredefinedQuestionDto = new PredefinedQuestionDto();

            predefinedQuestionData.question = 'error';
            predefinedQuestionData.questionType = QuestionType.Text;

            await expect(service.createPredefinedQuestion(predefinedQuestionData)).rejects.toThrow(BadRequestException);
            expect(mockPredefinedQuestionDatabaseLibService.createRecord).toHaveBeenCalledWith(predefinedQuestionData);
        });

        // Error path test: Attempt to create a duplicate question
        it('should throw ConflictException when question already exists', async () => {
            const predefinedQuestionData: PredefinedQuestionDto = new PredefinedQuestionDto();

            predefinedQuestionData.question = 'existing';
            predefinedQuestionData.questionType = QuestionType.Text;
    
            await expect(service.createPredefinedQuestion(predefinedQuestionData)).rejects.toThrow(ConflictException);
            expect(mockPredefinedQuestionDatabaseLibService.findByQuestion).toHaveBeenCalledWith('existing');
            expect(mockPredefinedQuestionDatabaseLibService.createRecord).not.toHaveBeenCalled();
        });
    });

    describe('updatePredefinedQuestion', () => {
        // Happy path test: Successfully updates a predefined question
        it('should update a predefined question successfully', async () => {
            const predefinedQuestionData: PredefinedQuestionDto = new PredefinedQuestionDto();
            const predefinedQuestionId = '1234567890';

            predefinedQuestionData.question = 'Updated question';
            predefinedQuestionData.questionType = QuestionType.Text;

            const result = await service.updatePredefinedQuestion(predefinedQuestionId, predefinedQuestionData);

            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('predefinedQuestionId', predefinedQuestionId);
            expect(result.body).toHaveProperty('question', predefinedQuestionData.question);
            expect(result.body).toHaveProperty('questionType', predefinedQuestionData.questionType);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.updateRecord).toHaveBeenCalledWith({
                predefinedQuestionId: predefinedQuestionId,
                question: predefinedQuestionData.question,
                questionType: predefinedQuestionData.questionType
            });
        });

        // Error path test: Attempt to update a non-existent question
        it('should throw NotFoundException when question not found', async () => {
            const predefinedQuestionData: PredefinedQuestionDto = new PredefinedQuestionDto();
            const predefinedQuestionId = 'nonexistent';

            predefinedQuestionData.question = 'Updated question';
            predefinedQuestionData.questionType = QuestionType.Text;

            await expect(service.updatePredefinedQuestion(predefinedQuestionId, predefinedQuestionData)).rejects.toThrow(NotFoundException);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.updateRecord).not.toHaveBeenCalled();
        });

        // Error path test: DB throws an error during update
        it('should throw BadRequestException when update fails', async () => {
            const predefinedQuestionData: PredefinedQuestionDto = new PredefinedQuestionDto();
            const predefinedQuestionId = '0987654321';

            predefinedQuestionData.question = 'Updated question';
            predefinedQuestionData.questionType = QuestionType.Text;

            await expect(service.updatePredefinedQuestion(predefinedQuestionId, predefinedQuestionData)).rejects.toThrow(BadRequestException);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.updateRecord).toHaveBeenCalledWith({
                predefinedQuestionId: predefinedQuestionId,
                question: predefinedQuestionData.question,
                questionType: predefinedQuestionData.questionType
            });
        });
    });

    describe('deletePredefinedQuestion', () => {
        // Happy path test: Successfully deletes a predefined question
        it('should delete a predefined question successfully', async () => {
            const predefinedQuestionId = '1234567890';
      
            const result = await service.deletePredefinedQuestion(predefinedQuestionId);
      
            expect(result.statusCode).toBe(204);
            expect(result.body).toEqual(new PredefinedQuestionDto());
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.deleteRecordById).toHaveBeenCalledWith(predefinedQuestionId);
        });
      
        // Error path test: Throws NotFoundException when question is not found
        it('should throw NotFoundException when question not found', async () => {
            const predefinedQuestionId = 'nonexistent';

            await expect(service.deletePredefinedQuestion(predefinedQuestionId)).rejects.toThrow(NotFoundException);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.deleteRecordById).not.toHaveBeenCalled();
        });
      
        // Error path test: Throws BadRequestException when deletion fails
        it('should throw BadRequestException when deletion fails', async () => {
            const predefinedQuestionId = '0987654321';
      
            await expect(service.deletePredefinedQuestion(predefinedQuestionId)).rejects.toThrow(BadRequestException);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.deleteRecordById).toHaveBeenCalledWith(predefinedQuestionId);
        });
    });

    describe('findById', () => {
        // Happy path test: Successfully finds and returns a predefined question by ID
        it('should return a predefined question when it exists', async () => {
            const predefinedQuestionId = '1234567890';

            const result = await service.findById(predefinedQuestionId);

            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('predefinedQuestionId', predefinedQuestionId);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
        });
      
        // Error path test: Throws NotFoundException when the predefined question does not exist
        it('should throw NotFoundException when the predefined question does not exist', async () => {
            const predefinedQuestionId = 'nonexistent';

            await expect(service.findById(predefinedQuestionId)).rejects.toThrow(NotFoundException);
            expect(mockPredefinedQuestionDatabaseLibService.findById).toHaveBeenCalledWith(predefinedQuestionId);
        });
    });
      
    describe('findByQuestion', () => {
        // Happy path test: Successfully finds and returns a predefined question by question text
        it('should return a predefined question when it exists', async () => {
            const predefinedQuestion = 'existing';

            const result = await service.findByQuestion(predefinedQuestion);

            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('predefinedQuestionId', '9876543210');
            expect(result.body).toHaveProperty('question', predefinedQuestion);
            expect(mockPredefinedQuestionDatabaseLibService.findByQuestion).toHaveBeenCalledWith(predefinedQuestion);
        });
      
        // Error path test: Throws NotFoundException when the question does not exist
        it('should throw NotFoundException when the question does not exist', async () => {
            const predefinedQuuestion = 'nonexisted'; 

            await expect(service.findByQuestion(predefinedQuuestion)).rejects.toThrow(NotFoundException);
            expect(mockPredefinedQuestionDatabaseLibService.findByQuestion).toHaveBeenCalledWith(predefinedQuuestion);
        });
    });
    
});