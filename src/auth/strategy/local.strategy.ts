/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Status } from '../entities/status.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('wrong username or password');
    }
    if (user.status === Status.INACTIVE) {
      throw new UnauthorizedException('Account not available');
    }
    if (user) {
      return await this.authService.validateUser(username, password);
    }
  }
}
