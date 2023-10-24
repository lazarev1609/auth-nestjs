import { Injectable } from '@nestjs/common';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { UserRepository } from '../../repositories/user.repository';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';
import { DomainException } from '../../common/exceptions/domain-exception';
import * as bcrypt from 'bcrypt';
import { UserManager } from '../users/user.manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userManager: UserManager,
  ) {}

  public async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    return new LoginResponseDto();
  }

  public async register(dto: RegistrationRequestDto): Promise<void> {
    if (dto.password !== dto.confirmedPassword) {
      throw new DomainException(
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
    console.log('>>>', password);
    const userToCreate = this.userManager.create(dto.email, password);

    await this.userRepository.save(userToCreate);
  }
}
