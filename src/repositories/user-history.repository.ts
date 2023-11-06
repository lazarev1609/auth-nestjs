import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistoryEntity } from '../services/users/entities/user-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserHistoryRepository {
  constructor(
    @InjectRepository(UserHistoryEntity)
    private readonly repo: Repository<UserHistoryEntity>,
  ) {}

  public async save(
    userHistory: UserHistoryEntity,
  ): Promise<UserHistoryEntity> {
    return await this.repo.save(userHistory);
  }

  public async getListByUserId(
    userId: string,
  ): Promise<[UserHistoryEntity[], number]> {
    return await this.repo
      .createQueryBuilder('user_history')
      .where('user_history.userId = :userId', { userId })
      .getManyAndCount();
  }
}
