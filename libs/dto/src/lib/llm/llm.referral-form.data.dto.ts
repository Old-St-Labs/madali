import { ApiProperty } from '@nestjs/swagger';

export class LLMReferralFormDataDto {
    @ApiProperty()
    employeeId!: string;

    @ApiProperty()
    employeeName!: string;

    @ApiProperty()
    referralDate!: string;
}
