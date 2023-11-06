import { Controller, Get, Req } from '@nestjs/common';
import RequestWithUser from '../../common/interfaces/request-with-user.interface';
import { UserResponseDto } from './dto/responses/user-response.dto';
import { UsersService } from './users.service';
import { ApiNeedAuth } from '../../common/decorators/auth.decorator';
import { UserHistoryListResponseDto } from './dto/responses/user-history-list-response.dto';

@ApiNeedAuth()
@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  private async getData(@Req() req: RequestWithUser): Promise<UserResponseDto> {
    return await this.usersService.getData(req.user);
  }

  @Get('/history')
  private async getAuthHistory(
    @Req() req: RequestWithUser,
  ): Promise<UserHistoryListResponseDto> {
    return await this.usersService.getAuthHistory(req.user.id);
  }
}
