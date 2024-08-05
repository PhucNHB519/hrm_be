import { UserEntity } from './../../user/model/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BriefEntity } from '../model/brief.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { CreateBriefDto } from '../dto/createBrief.request.dto';
import { Exception } from 'src/common/exeptionHandler/customExceptionHandler';
import { UserBriefEntity } from '../model/userBrief.entity';
import { User } from 'src/modules/user/model/user.interface';
import { Brief } from '../model/brief.interface';
import { UserBriefType } from 'src/common/constanst/enum';

@Injectable()
export class BriefService {
  constructor(
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
    @InjectRepository(UserBriefEntity)
    private readonly userBriefRepository: Repository<UserBriefEntity>,
  ) {}

  //----- BRIEF -----
  paginationAll(
    options: IPaginationOptions,
  ): Observable<Pagination<BriefEntity>> {
    return from(
      paginate<BriefEntity>(this.briefRepository, options, {
        // where: { status: 'active' },
      }),
    ).pipe(map((category: Pagination<BriefEntity>) => category));
  }

  async create(user: UserEntity, dto: CreateBriefDto) {
    try {
      //create brief
      const newBrief = await this.briefRepository.save({
        briefCode: dto.briefCode,
        createdDate: new Date(),
        phase: dto.phase,
        processingStep: dto.processingStep,
        product: dto.product,
        progress: dto.progress,
        status: 'Đang xử lý',
      });

      //create creator
      await this.createUserBrief(user, newBrief, UserBriefType.CREATOR);

      return newBrief;
    } catch (error) {
      Exception(error.message);
    }
  }

  async send(id: string) {
     return await this.briefRepository.update(id, {
        
     })
  }

  //----- USER BRIEF -----
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
