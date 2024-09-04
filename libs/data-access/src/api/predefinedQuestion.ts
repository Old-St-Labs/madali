/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosConfig } from './axiosConfig';

const API_PREDEFINED_QUESTION = '/predefined-question-dynamo-db';

class PredefinedQuestionApi extends AxiosConfig {
    constructor() {
        super(process.env.API_PREDEFINED_QUESTION_URL, true, true);
    }

    public getPredefinedQuestions = async <T>(): Promise<T> => {
        return await this.axiosInstance.get(`${API_PREDEFINED_QUESTION}`);
    };
}

const PredefinedQuestion = new PredefinedQuestionApi();
export { PredefinedQuestion };
