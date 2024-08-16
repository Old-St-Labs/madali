import { ApiProperty } from '@nestjs/swagger';

export class YohdaRequestDto {
    @ApiProperty()
    jobNumber!: string;
}