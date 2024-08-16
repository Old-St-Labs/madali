import { Module } from '@nestjs/common';
import { YohdaIntegrationServiceModule } from '../yohda-integration-service/yohda-integration.module';

@Module({
    imports: [YohdaIntegrationServiceModule],
})
export class AppModule {}
