import { ApiProperty } from '@nestjs/swagger';

export class LLMReportDto {
    @ApiProperty()
    jobId!: string;

    @ApiProperty()
    generatedReport!: string;

    @ApiProperty()
    threadId?: string;
}
