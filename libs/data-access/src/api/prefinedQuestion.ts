/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosConfig } from './axiosConfig';

const API_PREFINED_QUESTION = '/predefined-question-dynamo-db';

class PrefinedQuestionApi extends AxiosConfig {
    constructor() {
        super(process.env.API_PREFINED_QUESTION_URL, true, true);
    }

    public getPrefinedQuestions = async <T>(): Promise<T> => {
        return await this.axiosInstance.get(`${API_PREFINED_QUESTION}`);
    };
}

const PrefinedQuestion = new PrefinedQuestionApi();
export { PrefinedQuestion };
