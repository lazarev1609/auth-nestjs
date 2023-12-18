import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { UserRepository } from '../../repositories/user.repository';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';
import { DomainException } from '../../common/exceptions/domain-exception';
import * as bcrypt from 'bcrypt';
import { UserManager } from '../users/user.manager';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../../config/configuration.enum';
import { ChangePasswordRequestDto } from './dto/requests/change-password-request.dto';
import { RefreshRequestDto } from './dto/requests/refresh-request.dto';
import { RefreshResponseDto } from './dto/responses/refresh-response.dto';
import { UserHistoryEntity } from '../users/entities/user-history.entity';
import { UserHistoryRepository } from '../../repositories/user-history.repository';
import { VerifyRequestDto } from './dto/requests/VerifyRequest.dto';
import { VerifyResponseDto } from './dto/responses/verify-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userManager: UserManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userHistoryRepository: UserHistoryRepository,
  ) {}

  public async login(
    req: any,
    dto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const user = await this.userRepository.getByEmail(dto.email);
    if (!user) {
      throw new BadRequestException(`User with email ${dto.email} not found`);
    }

    const verifyPassword = await bcrypt.compare(dto.password, user.password);
    if (!verifyPassword) {
      throw new BadRequestException('Password incorrect');
    }
    const { accessToken, refreshToken } = await this.generateTokenPairs(user);

    user.refreshToken = refreshToken;
    const updateUser = await this.userRepository.save(user);

    const userHistory = new UserHistoryEntity();
    userHistory.user_agent = req.get('User-agent');
    userHistory.ip_address = req.get('Host');
    userHistory.url = req.url;
    userHistory.timestamp = new Date();
    userHistory.user = updateUser;
    await this.userHistoryRepository.save(userHistory);

    return new LoginResponseDto(accessToken, refreshToken);
  }

  public async logout(user: UserEntity): Promise<void> {
    user.refreshToken = null;
    await this.userRepository.save(user);
  }

  public async changePassword(
    user: UserEntity,
    dto: ChangePasswordRequestDto,
  ): Promise<void> {
    const verifyPassword = await bcrypt.compare(dto.oldPassword, user.password);
    if (!verifyPassword) {
      throw new BadRequestException('Password incorrect');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.save(user);
  }

  public async register(dto: RegistrationRequestDto): Promise<void> {
    if (dto.password !== dto.confirmedPassword) {
      throw new BadRequestException(
        'Passwords are not the same',
        'incorrect_confirmed_password',
      );
    }

    const existUser = await this.userRepository.getByEmail(dto.email);
    if (existUser) {
      throw new DomainException(
        `User with email = ${dto.email} already exist`,
        'incorrect_email',
      );
    }

    const password = await bcrypt.hash(dto.password, 10);
    const userToCreate = this.userManager.create(dto.email, password);

    await this.userRepository.save(userToCreate);
  }

  public async refreshToken(
    dto: RefreshRequestDto,
  ): Promise<RefreshResponseDto> {
    let verifyToken = null;
    try {
      verifyToken = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get(Config.JWT_REFRESH_SERCRET),
      });
    } catch (exception) {
      throw new UnauthorizedException('Token not fresh or incorrect');
    }

    const user = await this.userRepository.getById(verifyToken.userId);
    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    if (user.refreshToken !== dto.refreshToken) {
      throw new BadRequestException('Refresh token does not match');
    }

    const { accessToken, refreshToken } = await this.generateTokenPairs(user);

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return new RefreshResponseDto(accessToken, refreshToken);
  }

  private async generateTokenPairs(
    user: UserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      { userId: user.id, userRole: user.role },
      {
        secret: this.configService.get(Config.JWT_ACCESS_SECRET),
        expiresIn: this.configService.get(Config.JWT_ACCESS_EXPIRES_IN),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { userId: user.id, userRole: user.role },
      {
        secret: this.configService.get(Config.JWT_REFRESH_SERCRET),
        expiresIn: this.configService.get(Config.JWT_REFRESH_EXPIRES_IN),
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyToken(dto: VerifyRequestDto): Promise<VerifyResponseDto> {
    let verifyToken = null;

    try {
      verifyToken = this.jwtService.verify(dto.accessToken, {
        secret: this.configService.get(Config.JWT_ACCESS_SECRET),
      });
    } catch (exception) {
      throw new UnauthorizedException('Token not fresh or incorrect');
    }

    const userResponse = {
      userId: verifyToken.userId,
      role: verifyToken.role,
    };

    return {
      user: userResponse,
    };
  }
}
