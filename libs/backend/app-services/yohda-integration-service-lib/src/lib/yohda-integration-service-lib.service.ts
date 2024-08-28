
import { UserCognito } from '@auth-guard-lib';
import { ResponseDto, YohdaRecordDto, YohdaReferralFormDto, YohdaReferralNotesDto, YohdaResponseDto, YohdaResponseFormDto, YohdaResponseNotesDto } from '@dto';
import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { YohdaIntegrationServiceLib } from './yohda-integration-service.abstract.class';

@Injectable()
export class YohdaIntegrationServiceLibService implements YohdaIntegrationServiceLib {
    private readonly logger = new Logger(YohdaIntegrationServiceLibService.name);

    constructor(private readonly configService: ConfigService) { }

    async findByJobNumber(jobNumber: string, currentUser: UserCognito): Promise<ResponseDto<YohdaRecordDto[]>> {
        this.logger.log(`Finding records with job number ${jobNumber}`);

        if (!currentUser.username) {
            throw new UnauthorizedException('Invalid IdToken');
        }

        try {
            const yohdaApiUrl = this.configService.get<string>('YOHDA_API_URL');
            const getYohdaJobres = await axios.get(`${yohdaApiUrl}/${jobNumber}`);
            const employees = getYohdaJobres.data;

            const referralRecords: YohdaResponseDto[] = [];

            for (const employee of employees) {
                const employeeDetailAPI = 'https://890cddc7d65f75cb872975379cab6139.m.pipedream.net';
                const getYohdaEmployeeDataRes = await axios.get(`${employeeDetailAPI}/${employee.employeeId}`);
                const employeeData = getYohdaEmployeeDataRes.data;

                // Map employeeData to YohdaResponseDto
                const referralRecord: YohdaResponseDto = {
                    employee_id: employeeData.employee_id,
                    company: employeeData.company,
                    employee_name: employeeData.employee_name,
                    employee_job_title: employeeData.employee_job_title,
                    referral_date: employeeData.referral_date,
                    referral_form: employeeData.referral_form,
                    referral_notes: employeeData.referral_notes
                } as YohdaResponseDto;

                referralRecords.push(referralRecord);
            }

            if (!referralRecords || referralRecords.length === 0) {
                throw new NotFoundException(`Job Number Not Found: ${jobNumber}`);
            }

            const convertedRecords: YohdaRecordDto[] = await Promise.all(
                referralRecords.map(record => this.convertToDto(record))
            );

            const response: ResponseDto<YohdaRecordDto[]> = new ResponseDto<YohdaRecordDto[]>(200, convertedRecords);

            return response;

        } catch (error) {
            this.logger.error(error);

            throw new BadRequestException(`Unable to Find YOHDA data by JobId: ${jobNumber}`);
        }
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
        const formDto: YohdaReferralFormDto = {
            referralDate: referralForm.referral_date ? referralForm.referral_date : ''
        };

        return formDto;

    }

    private convertReferralNotes(referralNotes: YohdaResponseNotesDto): YohdaReferralNotesDto {
        const formDto: YohdaReferralNotesDto = {
            consultationDate: referralNotes.consultation_date ? referralNotes.consultation_date : ''
        };

        return formDto;

    }
}
