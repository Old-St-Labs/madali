import { AuthenticationServiceLibService } from '@authentication-service-lib';
import { CognitoCompleteNewPasswordDto, CognitoConfirmCodeDto, CognitoDto, CognitoEmailDto, CognitoForgotPasswordDto } from '@dto';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationServiceLibService
    ) { }

    @Get('token')
    @ApiQuery({
        name: 'code',
        type: String,
        required: true,
    })
    generateToken(@Query('code') code: string) {
        return this.authenticationService.generateToken(code);
    }

    @Post('invite-user')
    create(@Body() data: CognitoEmailDto) {
        return this.authenticationService.createAdminCognitoUser(data);
    }

    @Post('complete-new-password')
    completeNewPassword(@Body() data: CognitoCompleteNewPasswordDto) {
        return this.authenticationService.completeNewPassword(data);
    }

    @Post('sign-up')
    signUp(@Body() data: CognitoDto) {
        return this.authenticationService.signUp(data);
    }

    @Post('sign-up-confirmation')
    signUpConfirmation(@Body() data: CognitoConfirmCodeDto) {
        return this.authenticationService.confirmSignUp(data);
    }

    @Post('change-password')
    changePassword(@Body() data: CognitoDto) {
        return this.authenticationService.changePassword(data);
    }

    @Post('forgot-password')
    forgotPasword(@Body() data: CognitoEmailDto) {
        return this.authenticationService.forgotPassword(data);
    }



    @Post('confirm-password-change')
    confirmPasswordChange(@Body() data: CognitoForgotPasswordDto) {
        return this.authenticationService.confirmPasswordChange(data);
    }


    @Post('resend-confirmation')
    resendConfirmation(@Body() data: CognitoEmailDto) {
        return this.authenticationService.resendConfirmationCode(data);
    }

    @Post('login')
    login(@Body() data: CognitoDto) {
        return this.authenticationService.login(data);
    }

    @Post('resend-invitation')
    resendInvitation(@Body() data: CognitoEmailDto) {
        return this.authenticationService.resendInvitation(data);
    }

    @Delete()
    deleteUser(@Body() data: CognitoEmailDto) {
        return this.authenticationService.deleteUser(data);
    }
}
