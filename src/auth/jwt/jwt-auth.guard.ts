import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface RequestUser {
  id: number;
  email: string;
  name: string;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Требуется авторизация');
    }
    if (info) {
      throw new UnauthorizedException(info);
    }
    if (context) {
      throw new UnauthorizedException(status);
    }

    return user as RequestUser;
  }
}
