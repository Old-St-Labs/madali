import { ApiProperty } from '@nestjs/swagger';

export class YohdaReferralFormDto {
    @ApiProperty()
    referralDate!: string;
}