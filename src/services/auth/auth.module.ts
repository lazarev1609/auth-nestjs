import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserManager } from '../users/user.manager';
import { JwtModule } from '@nestjs/jwt';
import { UserHistoryEntity } from '../users/entities/user-history.entity';
import { UserHistoryRepository } from '../../repositories/user-history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserHistoryEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, UserManager, UserHistoryRepository],
})
export class AuthModule {}
