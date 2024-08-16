import { LLMDataDto, LLMInjectMessageDto, LLMReportDto, ResponseDto } from '@dto';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LLMServiceLib } from './llm-service-lib.abstract.class';

@Injectable()
export class LLMServiceLibService implements LLMServiceLib {

    private readonly logger = new Logger(LLMServiceLibService.name);
    private readonly openai = new OpenAI({ apiKey: this.configService.get<string>('OPENAI_API_KEY') });
    private readonly assistantId = this.configService.get<string>('OPENAI_CHAMBER_ASSISTANT_ID');

    constructor(private readonly configService: ConfigService) {

    }

    private async isOpenAIThreadExists(threadId: string): Promise<boolean> {
        try {
            await this.openai.beta.threads.retrieve(threadId);
        } catch (error) {
            this.logger.error(error);

            return false;
        }

        return true;
    }

    async generateReport(data: LLMDataDto): Promise<ResponseDto<LLMReportDto>> {
        this.logger.log(`Generating OpenAI Report Analysis for JobId ${data.jobId}`);

        if (data.threadId) {
            if (!await this.isOpenAIThreadExists(data.threadId)) {
                throw new NotFoundException(`ThreadId: ${data.threadId} not found`);
            }
        }

        try {
            this.logger.log(`Creating thread for assistant: ${this.assistantId}, for JobId: ${data.jobId}`);

            // Creating Assistant thread
            const threadId = data.threadId || (await this.openai.beta.threads.create()).id;

            // Adding message to thread
            await this.openai.beta.threads.messages.create(
                threadId,
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Referral Form'
                        },
                        {
                            type: 'text',
                            text: 'Referral Note'
                        },
                        {
                            type: 'text',
                            text: 'Questions'
                        }
                    ]
                }
            );

            // Run the thread
            this.logger.log(`Running thread: ${threadId} for assistant: ${this.assistantId}`);
            const run = await this.openai.beta.threads.runs.createAndPoll(threadId, {
                assistant_id: this.assistantId || '',
            });

            const messages = await this.openai.beta.threads.messages.list(threadId, {
                run_id: run.id,
            });

            const message = messages.data.pop()!;

            if (message.content[0].type === 'text') {
                const { text } = message.content[0];
                const { annotations } = text;

                let index = 0;

                for (const annotation of annotations) {
                    text.value = text.value.replace(annotation.text, '[' + index + ']');

                    index++;
                }

                const dto: LLMReportDto = {
                    jobId: data.jobId,
                    generatedReport: text.value,
                    threadId: threadId
                };

                const response: ResponseDto<LLMReportDto> = new ResponseDto<LLMReportDto>(200, dto);

                return response;
            } else {
                throw new BadRequestException('AI Unable to Generate Report');
            }
        } catch (error) {
            this.logger.error(error);

            throw new BadRequestException('Unable to Generate Report');
        }
    }

    async injectAIMessage(data: LLMInjectMessageDto): Promise<ResponseDto<LLMReportDto>> {
        if (data.threadId) {
            if (!await this.isOpenAIThreadExists(data.threadId)) {
                throw new NotFoundException(`ThreadId: ${data.threadId} not found`);
            }
        }

        try {
            this.logger.log(`Injecting message/instruction to update generated report for threadId: ${data.threadId}`);

            // Adding message to thread
            await this.openai.beta.threads.messages.create(
                data.threadId,
                {
                    role: 'user',
                    content: data.message
                }
            );

            // Run the thread
            this.logger.log(`Running thread: ${data.threadId} for assistant: ${this.assistantId}`);
            const run = await this.openai.beta.threads.runs.createAndPoll(data.threadId, {
                assistant_id: this.assistantId || '',
            });

            const messages = await this.openai.beta.threads.messages.list(data.threadId, {
                run_id: run.id,
            });

            const message = messages.data.pop()!;

            if (message.content[0].type === 'text') {
                const { text } = message.content[0];
                const { annotations } = text;

                let index = 0;

                for (const annotation of annotations) {
                    text.value = text.value.replace(annotation.text, '[' + index + ']');

                    index++;
                }

                const dto: LLMReportDto = {
                    jobId: data.jobId,
                    generatedReport: text.value,
                    threadId: data.threadId
                };

                const response: ResponseDto<LLMReportDto> = new ResponseDto<LLMReportDto>(200, dto);

                return response;
            } else {
                throw new BadRequestException('AI Unable to Generate Report');
            }
        } catch (error) {
            this.logger.error(error);

            throw new BadRequestException('Unable to Inject Message');
        }

    }

}
