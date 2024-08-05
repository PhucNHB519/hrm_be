import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBriefEntity } from '../model/userBrief.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/model/user.interface';
import { Brief } from '../model/brief.interface';
import { Exception } from 'src/common/exeptionHandler/customExceptionHandler';

@Injectable()
export class UserBriefService {
  constructor(
    @InjectRepository(UserBriefEntity)
    private readonly userBriefRepository: Repository<UserBriefEntity>,
  ) {}

  async createUserBrief(user: User, brief: Brief, type: string) {
    try {
      return await this.userBriefRepository.save({
        user: user,
        brief: brief,
        interactionType: type,
      });
    } catch (error) {
      Exception(error.message);
    }
  }
}
