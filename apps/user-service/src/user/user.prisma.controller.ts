import { CreateUserDto } from '@dto';

import {
    CurrentUser,
    UserCognito
} from '@auth-guard-lib';
import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserServiceLib } from '@user-service-lib';

@Controller('users-prisma-db')
@ApiTags('users-prisma-db')
@ApiBearerAuth('JWT-auth')
// @UseGuards(CognitoAuthGuard)
export class UserPrismaDbController {

    constructor(
        @Inject('UserServicePrismaLibService')
        private readonly userService: UserServiceLib
    ) { }

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.userService.createUserRecord(data);
    }

    @Get(':email')
    //@UseGuards(CognitoAuthGuard)
    getById(
        @CurrentUser() currentUser: UserCognito,
        @Param('email') email: string
    ) {
        return this.userService.findByEmail(email);
    }
}
