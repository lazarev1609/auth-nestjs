import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { AuthService } from './auth.service';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';
import { ApiNeedAuth } from '../../common/decorators/auth.decorator';
import RequestWithUser from '../../common/interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  private async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }

  @ApiNeedAuth()
  @Post('/logout')
  private async logout(@Req() req: RequestWithUser): Promise<void> {
    await this.authService.logout(req.user);
  }

  @Post('/register')
  private async register(@Body() dto: RegistrationRequestDto): Promise<void> {
    await this.authService.register(dto);
  }
}
