import { Module } from '@nestjs/common';
import { BriefService } from './service/brief.service';
import { BriefController } from './controller/brief.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BriefEntity } from './model/brief.entity';
import { UserBriefEntity } from './model/userBrief.entity';
import { UserModule } from '../user/user.module';
import { UserBriefService } from './service/userBrief.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BriefEntity, UserBriefEntity]),
    UserModule,
  ],
  providers: [BriefService, UserBriefService],
  controllers: [BriefController],
  exports: [BriefService, UserBriefService]
})
export class BriefModule {}
