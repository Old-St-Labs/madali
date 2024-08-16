import { CoreLibModule } from '@core-lib';
import { Module } from '@nestjs/common';
import { YohdaIntegrationServiceLibModule, YohdaIntegrationServiceLibService } from '@yohda-integration-service-lib';
import { YohdaIntegrationServiceController } from './yohda-integration.controller';

@Module({
    imports: [CoreLibModule, YohdaIntegrationServiceLibModule],
    controllers: [YohdaIntegrationServiceController],
    providers: [
        {
            provide: 'YohdaIntegrationServiceLibService',
            useClass: YohdaIntegrationServiceLibService,
        }
    ]
})
export class YohdaIntegrationServiceModule { }
