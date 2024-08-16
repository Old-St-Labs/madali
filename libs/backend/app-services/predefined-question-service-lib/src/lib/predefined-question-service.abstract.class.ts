import { CreatePredefinedQuestionDto, PredefinedQuestionDto, ResponseDto, UpdatePredefinedQuestionDto } from '@dto';

export abstract class PredefinedQuestionServiceLib {
    abstract getPredefinedQuestions(): Promise<ResponseDto<PredefinedQuestionDto[]>>;
    abstract createPredefinedQuestion(question: CreatePredefinedQuestionDto): Promise<ResponseDto<PredefinedQuestionDto>>;
    abstract updatePredefinedQuestion(id: string, question: UpdatePredefinedQuestionDto): Promise<ResponseDto<PredefinedQuestionDto>>;
    abstract deletePredefinedQuestion(id: string): Promise<ResponseDto<PredefinedQuestionDto>>;
    abstract findByQuestion(question: string): Promise<ResponseDto<PredefinedQuestionDto>>;
    abstract findById(id: string): Promise<ResponseDto<PredefinedQuestionDto>>;
}
