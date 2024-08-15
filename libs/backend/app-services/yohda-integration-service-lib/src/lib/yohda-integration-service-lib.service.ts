
import { ResponseDto, YohdaRecordDto, YohdaReferralFormDto, YohdaReferralNotesDto, YohdaResponseDto, YohdaResponseFormDto, YohdaResponseNotesDto } from '@dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { YohdaIntegrationServiceLib } from './yohda-integration-service.abstract.class';

@Injectable()
export class YohdaIntegrationServiceLibService implements YohdaIntegrationServiceLib {
    private readonly logger = new Logger(YohdaIntegrationServiceLibService.name);

    constructor(private readonly configService: ConfigService) {}

    async findByJobNumber(jobNumber: string): Promise<ResponseDto<YohdaRecordDto[]>> {
        this.logger.log(`Finding records with job number ${jobNumber}`);
       
        const yohdaApiUrl = this.configService.get<string>('YOHDA_API_URL');

        //dummy API: jobNumber should be 12345, else if jobNumber != 12345, it will return error
        const apiResponse = (await axios.get(`${yohdaApiUrl}${jobNumber}`)).data;
        
        const referralRecords: YohdaResponseDto[] = apiResponse.data ? apiResponse.data : [];

        // add checking of user credential to handle UnauthorizedException

        // if YOHDA API returned no data - job number does not exist
        // may remove the second condition when the yohda API is provided
        if(!referralRecords || referralRecords.length === 0) {
            throw new NotFoundException('Job Number Not Found');
        }

        const convertedRecords: YohdaRecordDto[] = await Promise.all(
            referralRecords.map(record => this.convertToDto(record))
        );

        const response: ResponseDto<YohdaRecordDto[]> = new ResponseDto<YohdaRecordDto[]>(200, convertedRecords);

        return response;
    }

    async convertToDto(record: YohdaResponseDto): Promise<YohdaRecordDto> {
        const dto: YohdaRecordDto = {
            employeeId: record.employee_id ? record.employee_id : '',
            company: record.company ? record.company : '',
            employeeName: record.employee_name ? record.employee_name : '',
            employeeJobTitle: record.employee_job_title ? record.employee_job_title : '',
            referralDate: record.referral_date ? record.referral_date : '',
            referralForm: this.convertReferralForm(record.referral_form),
            referralNotes: this.convertReferralNotes(record.referral_notes)
        };

        return dto;
    }

    private convertReferralForm(referralForm: YohdaResponseFormDto): YohdaReferralFormDto {
        const formDto:YohdaReferralFormDto = {
            referralDate: referralForm.referral_date ? referralForm.referral_date : ''
        };

        return formDto;

    }

    private convertReferralNotes(referralNotes: YohdaResponseNotesDto): YohdaReferralNotesDto {
        const formDto:YohdaReferralNotesDto = {
            consultationDate: referralNotes.consultation_date ? referralNotes.consultation_date : ''
        };

        return formDto;

    }
}