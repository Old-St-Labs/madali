import { ResponseDto, YohdaRecordDto } from '@dto';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import axios from 'axios';
import { YohdaIntegrationServiceLibService } from './yohda-integration-service-lib.service';

jest.mock('axios');

describe('YohdaIntegrationServiceLibService', () => {
    let service: YohdaIntegrationServiceLibService;
    let mockAxios: jest.Mocked<typeof axios>;

    const mockYohdaIntegrationServiceLibService = {
        findByJobNumber: jest.fn().mockImplementation((jobNumber: string) => {
            if (jobNumber === '56789') {
                mockAxios.get('56789');

                return Promise.reject(new NotFoundException('Job Number Not Found'));
            } else {
                mockAxios.get('12345');

                const response: ResponseDto<YohdaRecordDto[]> = {
                    body: [
                        {
                            employeeId: 'sample_id',
                            company: 'sample_company',
                            employeeName: 'sample_name',
                            employeeJobTitle: '',
                            referralDate: '2010-11-12T13:14:15Z',
                            referralForm: {
                                referralDate: '2010-11-12T13:14:15Z'
                            },
                            referralNotes: {
                                consultationDate: '2010-11-12T13:14:15Z'
                            }
                        }
                    ],
                    statusCode: 200
                };

                return response;
            }
        })
    };

    const mockConfigService = {
        get: jest.fn().mockImplementation((key: string) => {
            switch (key) {
                case 'YOHDA_API_URL':
                    return 'http://mock-yohda-api.com';
                default:
                    return null;
            }
        }),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                YohdaIntegrationServiceLibService,
                ConfigService
            ],
        })
            .overrideProvider(YohdaIntegrationServiceLibService)
            .useValue(mockYohdaIntegrationServiceLibService)
            .overrideProvider(ConfigService)
            .useValue(mockConfigService)
            .compile();
        
        service = module.get(YohdaIntegrationServiceLibService);

        mockAxios = axios as jest.Mocked<typeof axios>;

        mockAxios.get.mockResolvedValue({
            data: {
                data : [
                    {
                        employee_id: 'sample_id',
                        company: 'sample_company',
                        employee_name: 'sample_name',
                        employee_job_title: '',
                        referral_date: '2010-11-12T13:14:15Z',
                        referral_form: {
                            referral_date: '2010-11-12T13:14:15Z'
                        },
                        referral_notes: {
                            consultation_date: '2010-11-12T13:14:15Z'
                        }
                    }
                ]
            }
        });

        jest.clearAllMocks();
    });

    it('it should be defined', () => {
        expect(service).toBeTruthy();
    });

    // find by job number happy path
    it('it should find jobs by job number', async () => {
        const result = await service.findByJobNumber('12345');

        expect(result.statusCode).toEqual(200);
        expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('12345'));
    });

    // find by job number not found
    it('it should NOT find a job by job number', async () => {
        await expect(service.findByJobNumber('56789'))
            .rejects.toThrow(new NotFoundException('Job Number Not Found'));
        expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('56789'));
    });

});