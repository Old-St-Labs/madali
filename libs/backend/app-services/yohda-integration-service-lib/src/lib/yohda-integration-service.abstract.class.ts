import { UserCognito } from '@auth-guard-lib';
import { ResponseDto, YohdaRecordDto } from '@dto';

export abstract class YohdaIntegrationServiceLib {
    abstract findByJobNumber(jobNumber: string, currentUser: UserCognito): Promise<ResponseDto<YohdaRecordDto[]>>;

    abstract convertToDto(record: unknown): Promise<YohdaRecordDto>;
}