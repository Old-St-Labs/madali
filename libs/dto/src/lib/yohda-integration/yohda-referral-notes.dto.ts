import { ApiProperty } from '@nestjs/swagger';

export class YohdaReferralNotesDto {
    @ApiProperty()
    consultationDate!: string;
}