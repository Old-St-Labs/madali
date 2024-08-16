import { ResponseDto, YohdaRecordDto } from '@dto';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { YohdaIntegrationServiceLib } from '@yohda-integration-service-lib';

@Controller('yohda-integration')
@ApiTags('yohda-integration')

export class YohdaIntegrationServiceController {
    constructor(
        @Inject('YohdaIntegrationServiceLibService') private readonly yohdaIntegrationService: YohdaIntegrationServiceLib
    ) { }

    @Get('job/:jobNumber')
    getByJobNumber(
        @Param('jobNumber') jobNumber: string
    ) : Promise<ResponseDto<YohdaRecordDto[]>>{
        return this.yohdaIntegrationService.findByJobNumber(jobNumber);
    }
}