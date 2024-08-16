import { LLMDataDto, LLMInjectMessageDto } from '@dto';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import OpenAI from 'openai';
import { LLMServiceLibService } from './llm-service-lib.service';

jest.mock('openai');

describe('LLMServiceLibService', () => {
    let service: LLMServiceLibService;
    let openAIMock: jest.Mocked<OpenAI>;

    const mockConfigService = {
        get: jest.fn().mockImplementation((key: string) => {
            switch (key) {
                case 'OPENAI_API_KEY':
                    return 'apiKey';
                case 'OPENAI_CHAMBER_ASSISTANT_ID':
                    return 'assistantId';
                default:
                    return null;
            }
        }),

    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                LLMServiceLibService,
                ConfigService
            ],
        })
            .overrideProvider(ConfigService)
            .useValue(mockConfigService)
            .compile();

        service = module.get(LLMServiceLibService);

        openAIMock = {
            beta: {
                threads: {
                    create: jest.fn().mockResolvedValue({ id: 'mock-thread-id' }),
                    retrieve: jest.fn().mockImplementation((threadId: string) => {
                        if (threadId === 'non-existing-thread-id') {
                            return Promise.reject(new Error('Thread not found'));
                        }

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return Promise.resolve({} as any);
                    }),
                    runs: {
                        createAndPoll: jest.fn().mockResolvedValue({ id: 'mock-run-id' }),
                    },
                    messages: {
                        create: jest.fn(),
                        list: jest.fn().mockResolvedValue({
                            data: [
                                {
                                    content: [
                                        {
                                            type: 'text',
                                            text: {
                                                value: 'Generated report content',
                                                annotations: [],
                                            },
                                        },
                                    ],
                                },
                            ],
                        }),
                    },
                },
            },
        } as unknown as jest.Mocked<OpenAI>;

        (OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(() => openAIMock);

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });

    describe('isOpenAIThreadExists', () => {
        it('should return true if thread exists', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await (service as any).isOpenAIThreadExists('existing-thread-id');

            expect(result).toBe(true);
        });

        it('should return false if thread does not exist', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await (service as any).isOpenAIThreadExists('non-existing-thread-id');

            expect(result).toBe(false);
        });
    });

    describe('generateReport', () => {
        it('should generate a report successfully', async () => {
            const llmData = new LLMDataDto();

            llmData.jobId = '12345';
            llmData.threadId = 'existing-thread-id';

            const result = await service.generateReport(llmData);

            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('jobId', '12345');
            expect(result.body).toHaveProperty('generatedReport', 'Generated report content');
            expect(result.body).toHaveProperty('threadId', llmData.threadId);
        });

        it('should throw NotFoundException if thread does not exist', async () => {
            const llmData = new LLMDataDto();

            llmData.jobId = '12345';
            llmData.threadId = 'non-existing-thread-id';

            await expect(service.generateReport(llmData)).rejects.toThrow(NotFoundException);
        });

        it('should create a new thread if threadId is not provided', async () => {
            const llmData = new LLMDataDto();

            llmData.jobId = '12345';

            const result = await service.generateReport(llmData);

            expect(result.statusCode).toBe(200);
        });
    });

    describe('injectAIMessage', () => {
        it('should inject a message successfully', async () => {
            const injectData = new LLMInjectMessageDto();

            injectData.jobId = '12345';
            injectData.threadId = 'existing-thread-id';
            injectData.message = 'New message';

            const result = await service.injectAIMessage(injectData);

            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('jobId', '12345');
            expect(result.body).toHaveProperty('generatedReport', 'Generated report content');
            expect(result.body).toHaveProperty('threadId', 'existing-thread-id');
        });

        it('should throw NotFoundException if thread does not exist', async () => {
            const injectData = new LLMInjectMessageDto();

            injectData.jobId = '12345';
            injectData.threadId = 'non-existing-thread-id';
            injectData.message = 'New message';

            await expect(service.injectAIMessage(injectData)).rejects.toThrow(NotFoundException);
        });
    });
});
