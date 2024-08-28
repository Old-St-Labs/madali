import { CognitoAuthGuard, CurrentUser, UserCognito } from '@auth-guard-lib';
import { ResponseDto, YohdaRecordDto } from '@dto';
import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { YohdaIntegrationServiceLib } from '@yohda-integration-service-lib';

@Controller('yohda-integration')
@ApiTags('yohda-integration')
@ApiBearerAuth('JWT-auth')
@UseGuards(CognitoAuthGuard)

export class YohdaIntegrationServiceController {
    constructor(
        @Inject('YohdaIntegrationServiceLibService') private readonly yohdaIntegrationService: YohdaIntegrationServiceLib
    ) { }

    @Get('job/:jobNumber')
    async getDataByJobNumber(
        @CurrentUser() currentUser: UserCognito,
        @Param('jobNumber') jobNumber: string
    ): Promise<ResponseDto<YohdaRecordDto[]>> {
        return await this.yohdaIntegrationService.findByJobNumber(jobNumber, currentUser);
    }
}