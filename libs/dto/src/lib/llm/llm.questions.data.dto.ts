import { ApiProperty } from '@nestjs/swagger';

export class LLMQuestionsDataDto {
    @ApiProperty()
    question!: string;

    @ApiProperty()
    questionType!: string;

    @ApiProperty()
    response!: string;
}
