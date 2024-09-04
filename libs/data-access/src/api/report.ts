/* eslint-disable @typescript-eslint/no-explicit-any */
import { LLMDataDto, LLMInjectMessageDto } from '@dto';
import { AxiosConfig } from './axiosConfig';

const API_LLM_REPORT = '/llm/report';

class ReportApi extends AxiosConfig {
    constructor() {
        super(process.env.API_GENERATE_REPORT_URL, true, true);
    }

    public postGenerateReport = async <T>(data: LLMDataDto): Promise<T> => {
        return await this.axiosInstance.post(`${API_LLM_REPORT}`, data);
    };

    public postGenerateReportMessage = async <T>(
        data: LLMInjectMessageDto
    ): Promise<T> => {
        return await this.axiosInstance.post(`${API_LLM_REPORT}/message`, data);
    };
}

const Report = new ReportApi();
export { Report };
