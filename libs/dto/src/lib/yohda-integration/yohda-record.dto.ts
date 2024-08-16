import { ApiProperty } from '@nestjs/swagger';
import { YohdaReferralFormDto } from './yohda-referral-form.dto';
import { YohdaReferralNotesDto } from './yohda-referral-notes.dto';

export class YohdaRecordDto{
    @ApiProperty()
    employeeId!: string;
    
    @ApiProperty()
    company!: string;
    
    @ApiProperty()
    employeeName!: string;
    
    @ApiProperty()
    employeeJobTitle!: string;
    
    @ApiProperty()
    referralDate!: string;

    @ApiProperty({type: () => YohdaReferralFormDto})
    referralForm!: YohdaReferralFormDto;

    @ApiProperty({type: () => YohdaReferralNotesDto})
    referralNotes!: YohdaReferralNotesDto;
}
