import { ResponseDto, YohdaRecordDto } from '@dto';

export abstract class YohdaIntegrationServiceLib {
    abstract findByJobNumber(jobNumber: string): Promise<ResponseDto<YohdaRecordDto[]>>;

    abstract convertToDto(record: unknown): Promise<YohdaRecordDto>;
}