import { Module } from '@nestjs/common';
import { LLMServiceLibService } from './llm-service-lib.service';

@Module({
    imports: [],
    providers: [LLMServiceLibService],
    exports: [LLMServiceLibService],
})
export class LLMServiceLibModule { }

