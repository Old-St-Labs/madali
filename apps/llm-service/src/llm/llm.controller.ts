import { LLMDataDto, LLMInjectMessageDto } from '@dto';
import { LLMServiceLibService } from '@llm-service-lib';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@Controller('llm')
@ApiTags('llm')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(CognitoAuthGuard)
export class LLMController {

    constructor(
        @Inject('LLMServiceLibService')
        private readonly llmService: LLMServiceLibService
    ) { }

    @Post('report')
    async generateReportByLLMAssistant(
        @Body() data: LLMDataDto
    ) {
        return await this.llmService.generateReport(data);
    }

    @Post('report/message')
    async sendMessageToLLMAssistant(
        @Body() data: LLMInjectMessageDto
    ) {
        return await this.llmService.injectAIMessage(data);
    }
}
