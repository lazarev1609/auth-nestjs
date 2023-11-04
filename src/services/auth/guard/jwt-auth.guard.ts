import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../../../config/configuration.enum';
import { UserRepository } from '../../../repositories/user.repository';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Token is not set');
    }

    let verifyToken = null;
    try {
      verifyToken = this.jwtService.verify(accessToken, {
        secret: this.configService.get(Config.JWT_ACCESS_SECRET),
      });
    } catch (exception) {
      throw new UnauthorizedException('Token not fresh or incorrect');
    }

    const user = await this.userRepository.getById(verifyToken.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;
    return true;
  }
}
