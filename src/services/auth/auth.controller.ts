import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { AuthService } from './auth.service';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }

  @Post('/register')
  private async register(@Body() dto: RegistrationRequestDto): Promise<void> {
    return await this.authService.register(dto);
  }
}
