import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CognitoAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }
}
