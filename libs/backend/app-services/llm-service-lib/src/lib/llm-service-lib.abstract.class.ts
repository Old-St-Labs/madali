import { LLMDataDto, LLMReportDto, ResponseDto } from '@dto';

export abstract class LLMServiceLib {

    abstract generateReport(data: LLMDataDto): Promise<ResponseDto<LLMReportDto>>;

}