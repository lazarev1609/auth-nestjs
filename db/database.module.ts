import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '../config/configuration.enum';
import { UserEntity } from '../src/users/entities/user.entity';
import { RoleEntity } from '../src/users/entities/role.entity';
import { UserHistoryEntity } from '../src/users/entities/user-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Config.DB_HOST),
        port: configService.get(Config.DB_PORT),
        username: configService.get(Config.DB_USER),
        password: configService.get(Config.DB_PASSWORD),
        database: configService.get(Config.DB_DATABASE),
        entities: [UserEntity, RoleEntity, UserHistoryEntity],
        synchronize: false,
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
