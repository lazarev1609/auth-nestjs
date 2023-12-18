import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { AuthService } from './auth.service';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';
import { ApiNeedAuth } from '../../common/decorators/auth.decorator';
import RequestWithUser from '../../common/interfaces/request-with-user.interface';
import { ChangePasswordRequestDto } from './dto/requests/change-password-request.dto';
import { RefreshRequestDto } from './dto/requests/refresh-request.dto';
import { RefreshResponseDto } from './dto/responses/refresh-response.dto';
import { VerifyRequestDto } from './dto/requests/VerifyRequest.dto';
import { VerifyResponseDto } from './dto/responses/verify-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  private async login(
    @Req() req,
    @Body() dto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(req, dto);
  }

  @ApiNeedAuth()
  @Post('/logout')
  private async logout(@Req() req: RequestWithUser): Promise<void> {
    await this.authService.logout(req.user);
  }

  @ApiNeedAuth()
  @Put('/password/change')
  private async changePassword(
    @Req() req: RequestWithUser,
    @Body() dto: ChangePasswordRequestDto,
  ): Promise<void> {
    await this.authService.changePassword(req.user, dto);
  }

  @Post('/register')
  private async register(@Body() dto: RegistrationRequestDto): Promise<void> {
    await this.authService.register(dto);
  }

  @Post('/token/refresh')
  private async refrehToken(
    @Body() dto: RefreshRequestDto,
  ): Promise<RefreshResponseDto> {
    return await this.authService.refreshToken(dto);
  }

  @Post('/token/verify')
  private async vetifyToken(
    @Body() dto: VerifyRequestDto,
  ): Promise<VerifyResponseDto> {
    return await this.authService.verifyToken(dto);
  }
}
