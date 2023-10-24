import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../services/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  public async getByEmail(email: string): Promise<UserEntity> {
    return await this.repo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    return await this.repo.save(user);
  }
}
