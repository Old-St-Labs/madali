import { CreatePredefinedQuestionDto, PredefinedQuestionDto, ResponseDto, UpdatePredefinedQuestionDto } from '@dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PredefinedQuestionServiceDynamoLibService, PredefinedQuestionServiceLib } from '@predefined-question-service-lib';

@Controller('predefined-question-dynamo-db')
@ApiTags('predefined-question-dynamo-db')
export class PredefinedQuestionDynamoDbController {

    constructor(
        @Inject(PredefinedQuestionServiceDynamoLibService)
        private readonly predefinedQuestionService: PredefinedQuestionServiceLib
    ) { }

    @Get()
    getAll(): Promise<ResponseDto<PredefinedQuestionDto[]>> {
        return this.predefinedQuestionService.getPredefinedQuestions();
    }

    @Get(':questionId')
    getById(@Body('questionId') questionId: string): Promise<ResponseDto<PredefinedQuestionDto>> {
        return this.predefinedQuestionService.findById(questionId);
    }

    @Post()
    create(@Body() data: CreatePredefinedQuestionDto): Promise<ResponseDto<PredefinedQuestionDto>> {
        return this.predefinedQuestionService.createPredefinedQuestion(data);
    }

    @Put(':questionId')
    update(@Param('questionId') questionId: string, @Body() data: UpdatePredefinedQuestionDto): Promise<ResponseDto<PredefinedQuestionDto>> {
        return this.predefinedQuestionService.updatePredefinedQuestion(questionId, data);
    }

    @Delete(':questionId')
    delete(@Param('questionId') questionId: string): Promise<ResponseDto<PredefinedQuestionDto>> {
        return this.predefinedQuestionService.deletePredefinedQuestion(questionId);
    }
}