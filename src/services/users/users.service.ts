import { BadRequestException, Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/responses/user-response.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { UserHistoryListResponseDto } from './dto/responses/user-history-list-response.dto';
import { UserHistoryRepository } from '../../repositories/user-history.repository';
import { UserRoleResponseDto } from './dto/responses/user-role-response.dto';
import { UserRoleUpdateRequestDto } from './dto/requests/user-role-update-request.dto';
import { UserRoleDeleteRequestDto } from './dto/requests/user-role-delete-request.dto';
import { UserRolesEnum } from '../../enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userHistoryRepository: UserHistoryRepository,
  ) {}

  public async getData(user: UserEntity): Promise<UserResponseDto> {
    return new UserResponseDto(user);
  }

  public async getAuthHistory(
    userId: string,
  ): Promise<UserHistoryListResponseDto> {
    const [items, totalCount] =
      await this.userHistoryRepository.getListByUserId(userId);

    return new UserHistoryListResponseDto(items, totalCount);
  }

  public async getRole(user: UserEntity): Promise<UserRoleResponseDto> {
    return {
      role: user.role,
    };
  }

  public async updateRole(
    user: UserEntity,
    dto: UserRoleUpdateRequestDto,
  ): Promise<UserRoleResponseDto> {
    if (user.role === dto.role) {
      throw new BadRequestException('Roles is the same');
    }

    user.role = dto.role;
    const updateUser = await this.userRepository.save(user);

    return {
      role: updateUser.role,
    };
  }

  public async deleteRole(
    user: UserEntity,
    dto: UserRoleDeleteRequestDto,
  ): Promise<UserRoleResponseDto> {
    if (user.role !== dto.role) {
      throw new BadRequestException('Roles does not have this role');
    }

    user.role = UserRolesEnum.user;

    const updateUser = await this.userRepository.save(user);

    return {
      role: updateUser.role,
    };
  }
}
