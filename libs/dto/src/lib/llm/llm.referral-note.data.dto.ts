import { ApiProperty } from '@nestjs/swagger';

export class LLMReferralNoteDataDto {
    @ApiProperty()
    employeeId!: string;

    @ApiProperty()
    employeeName!: string;

    @ApiProperty()
    referralDate!: string;
}
