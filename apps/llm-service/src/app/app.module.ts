import { Module } from '@nestjs/common';

import { CoreLibModule } from '@core-lib';
import { LLMServiceModule } from '../llm/llm.module';

@Module({
    imports: [CoreLibModule, LLMServiceModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
