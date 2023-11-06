import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/responses/user-response.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { UserHistoryListResponseDto } from './dto/responses/user-history-list-response.dto';
import { UserHistoryRepository } from '../../repositories/user-history.repository';

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
}
