import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { QuestionType } from '../enum/predefined.question.type.enum';

export class PredefinedQuestionDto {

    @ApiProperty()
    @IsString()
    predefinedQuestionId!: string; // Corresponds to SK

    @ApiProperty()
    @IsString()
    question!: string; // Corresponds to question

    @ApiProperty({ enum: QuestionType })
    @IsString()
    questionType!: QuestionType; // Corresponds to GSI2PK

}