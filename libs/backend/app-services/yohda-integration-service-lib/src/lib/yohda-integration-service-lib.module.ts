import { Module } from '@nestjs/common';
import { YohdaIntegrationServiceLibService } from './yohda-integration-service-lib.service';

@Module({
    providers: [YohdaIntegrationServiceLibService],
    exports: [YohdaIntegrationServiceLibService],
})
export class YohdaIntegrationServiceLibModule {}
