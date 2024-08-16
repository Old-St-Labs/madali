import { ApiProperty } from '@nestjs/swagger';

export class YohdaResponseDto {
    @ApiProperty()
    employee_id!: string;
    
    @ApiProperty()
    company!: string;
    
    @ApiProperty()
    employee_name!: string;
    
    @ApiProperty()
    employee_job_title!: string;
    
    @ApiProperty()
    referral_date!: string;

    @ApiProperty({type: () => Object})
    referral_form!: {
        referral_date: string;
    };

    @ApiProperty({type: () => Object})
    referral_notes!: {
        consultation_date: string;
    };
}