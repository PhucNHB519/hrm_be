import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { UserBriefEntity } from '../brief/model/userBrief.entity';
import { BriefEntity } from '../brief/model/brief.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserBriefEntity, BriefEntity]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
