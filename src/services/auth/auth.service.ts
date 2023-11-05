import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userManager: UserManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
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
    await this.userRepository.save(user);

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
}
