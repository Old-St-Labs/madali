import { CreatePredefinedQuestionDto, PredefinedQuestionDto, QuestionType, ResponseDto, UpdatePredefinedQuestionDto } from '@dto';
import { PredefinedQuestionDataType } from '@dynamo-db-lib';
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PredefinedQuestionDatabaseDynamodbLibService } from '@predefined-question-database-lib';
import { PredefinedQuestionServiceLib } from './predefined-question-service.abstract.class';

@Injectable()
export class PredefinedQuestionServiceDynamoLibService implements PredefinedQuestionServiceLib {

    private readonly logger = new Logger(PredefinedQuestionDatabaseDynamodbLibService.name);

    constructor(private readonly predefinedDBService: PredefinedQuestionDatabaseDynamodbLibService) { }
    async getPredefinedQuestions(): Promise<ResponseDto<PredefinedQuestionDto[]>> {
        try {
            const predefinedQuestions = await this.predefinedDBService.findAll();
            
            this.logger.log(`Fetched ${predefinedQuestions.length} predefined questions.`);
            
            const dtos: PredefinedQuestionDto[] = await Promise.all(predefinedQuestions.map(question => this.convertToDto(question)));
            const response: ResponseDto<PredefinedQuestionDto[]> = new ResponseDto<PredefinedQuestionDto[]>(200, dtos);
            
            return response;
        } catch (error) {
            this.logger.error('Failed to fetch predefined questions', error);
            throw new BadRequestException('Unable to fetch predefined questions');
        }
    }

    async createPredefinedQuestion(predefinedQuestionData: CreatePredefinedQuestionDto): Promise<ResponseDto<PredefinedQuestionDto>> {

        this.logger.log(`Creating Predefined Question: ${predefinedQuestionData.question} of type ${predefinedQuestionData.questionType}`);

        const existingQuestion = await this.predefinedDBService.findByQuestion(predefinedQuestionData.question);

        if (existingQuestion) {
            throw new ConflictException('The question you are trying to add already exists');
        }

        try {
            const predefinedQuestionRecord: PredefinedQuestionDataType = await this.predefinedDBService.createRecord(predefinedQuestionData);
            const dto: PredefinedQuestionDto = await this.convertToDto(predefinedQuestionRecord);

            const response: ResponseDto<PredefinedQuestionDto> = new ResponseDto<PredefinedQuestionDto>(201, dto);

            return response;

        } catch (error) {
            this.logger.error(error);

            throw new BadRequestException('Unable to create record');
        }

    }

    async updatePredefinedQuestion(id: string, predefinedQuestionData: UpdatePredefinedQuestionDto): Promise<ResponseDto<PredefinedQuestionDto>> {
        this.logger.log(`Updating Predefined Question with id: ${id}`);

        await this.findById(id);
    
        try {
            predefinedQuestionData.predefinedQuestionId = id;

            const updatedRecord: PredefinedQuestionDataType = await this.predefinedDBService.updateRecord(predefinedQuestionData);
            const dto: PredefinedQuestionDto = await this.convertToDto(updatedRecord);

            const response: ResponseDto<PredefinedQuestionDto> = new ResponseDto<PredefinedQuestionDto>(200, dto);

            return response;

        } catch (error) {
            this.logger.error(error);
            
            throw new BadRequestException('Unable to update record');
        }
    }

    async deletePredefinedQuestion(id: string): Promise<ResponseDto<PredefinedQuestionDto>> {
        
        this.logger.log(`Deleting Predefined Question with id: ${id}`);

        await this.findById(id);

        try {
            await this.predefinedDBService.deleteRecordById(id);
            
            const response: ResponseDto<PredefinedQuestionDto> = new ResponseDto<PredefinedQuestionDto>(204, new PredefinedQuestionDto());

            return response;

        } catch (error) {
            this.logger.error(error);

            throw new BadRequestException('Unable to delete record');
        }
    }

    async findByQuestion(question: string): Promise<ResponseDto<PredefinedQuestionDto>> {
        
        this.logger.log(`Finding Predefined Question with question: ${question}`);

        const predefinedQuestionRecord = await this.predefinedDBService.findByQuestion(question);

        if (!predefinedQuestionRecord) {
            throw new NotFoundException('Predefined question not found');
        }   

        const dto: PredefinedQuestionDto = await this.convertToDto(predefinedQuestionRecord);

        const response: ResponseDto<PredefinedQuestionDto> = new ResponseDto<PredefinedQuestionDto>(200, dto);

        return response;
    }

    async findById(id: string): Promise<ResponseDto<PredefinedQuestionDto>> {

        this.logger.log(`Finding Predefined Question with id: ${id}`);

        const predefinedQuestionRecord = await this.predefinedDBService.findById(id);

        if (!predefinedQuestionRecord) {
            throw new NotFoundException(`Predefined question with id ${id} not found`);
        }

        const dto: PredefinedQuestionDto = await this.convertToDto(predefinedQuestionRecord);

        const response: ResponseDto<PredefinedQuestionDto> = new ResponseDto<PredefinedQuestionDto>(200, dto);

        return response;
    }

    async convertToDto(record: PredefinedQuestionDataType): Promise<PredefinedQuestionDto> {

        const dto: PredefinedQuestionDto = {
            predefinedQuestionId: record.predefinedQuestionId ? record.predefinedQuestionId : '',
            questionType: (record.questionType as QuestionType) || QuestionType.Text,
            question: record.question ? record.question : '',
        };

        return dto;

    }
}