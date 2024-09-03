import { ApiProperty } from '@nestjs/swagger';
import { LLMQuestionsDataDto } from './llm.questions.data.dto';
import { LLMReferralFormDataDto } from './llm.referral-form.data.dto';
import { LLMReferralNoteDataDto } from './llm.referral-note.data.dto';

export class LLMDataDto {
    @ApiProperty()
    jobId!: string;

    @ApiProperty({ type: LLMReferralNoteDataDto })
    referralNote!: LLMReferralNoteDataDto;

    @ApiProperty({ type: LLMReferralFormDataDto })
    referralForm!: LLMReferralFormDataDto;

    @ApiProperty({ type: [LLMQuestionsDataDto] })
    questions!: Array<LLMQuestionsDataDto>;

    @ApiProperty()
    threadId?: string;
}
