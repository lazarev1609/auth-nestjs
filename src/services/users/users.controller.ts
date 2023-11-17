import { Body, Controller, Delete, Get, Put, Req } from '@nestjs/common';
import RequestWithUser from '../../common/interfaces/request-with-user.interface';
import { UserResponseDto } from './dto/responses/user-response.dto';
import { UsersService } from './users.service';
import { ApiNeedAuth } from '../../common/decorators/auth.decorator';
import { UserHistoryListResponseDto } from './dto/responses/user-history-list-response.dto';
import { UserRoleResponseDto } from './dto/responses/user-role-response.dto';
import { UserRoleUpdateRequestDto } from './dto/requests/user-role-update-request.dto';
import { UserRoleDeleteRequestDto } from './dto/requests/user-role-delete-request.dto';

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

  @Get('/me/role')
  private async getRole(
    @Req() req: RequestWithUser,
  ): Promise<UserRoleResponseDto> {
    return await this.usersService.getRole(req.user);
  }

  @Put('/me/role')
  private async updateRole(
    @Req() req: RequestWithUser,
    @Body() dto: UserRoleUpdateRequestDto,
  ): Promise<UserRoleResponseDto> {
    return await this.usersService.updateRole(req.user, dto);
  }

  @Delete('/me/role')
  private async deleteRole(
    @Req() req: RequestWithUser,
    @Body() dto: UserRoleDeleteRequestDto,
  ): Promise<UserRoleResponseDto> {
    return await this.usersService.deleteRole(req.user, dto);
  }
}
