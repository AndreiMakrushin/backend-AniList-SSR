import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-super-secret-key-change-it',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userService.findById(payload.sub);

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
