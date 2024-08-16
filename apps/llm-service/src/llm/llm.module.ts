import { CoreLibModule } from '@core-lib';
import { LLMServiceLibModule, LLMServiceLibService } from '@llm-service-lib';
import { Module } from '@nestjs/common';
import { LLMController } from './llm.controller';

@Module({
    imports: [
        CoreLibModule,
        LLMServiceLibModule,
    ],
    controllers: [LLMController],
    providers: [
        {
            provide: 'LLMServiceLibService',
            useClass: LLMServiceLibService
        }
    ]
})
export class LLMServiceModule { }
