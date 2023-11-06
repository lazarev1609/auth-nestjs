import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from '../../repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserHistoryEntity } from './entities/user-history.entity';
import { UserHistoryRepository } from '../../repositories/user-history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserHistoryEntity]),
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserHistoryRepository],
})
export class UsersModule {}
