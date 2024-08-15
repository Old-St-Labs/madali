import { ApiProperty } from '@nestjs/swagger';

export class LLMInjectMessageDto {
    @ApiProperty()
    threadId!: string;

    @ApiProperty()
    message!: string;

    @ApiProperty()
    jobId!: string;
}
