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
import { UserBriefService } from './userBrief.service';

@Injectable()
export class BriefService {
  constructor(
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
    private userBriefService: UserBriefService
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
      await this.userBriefService.createUserBrief(user, newBrief, UserBriefType.CREATOR);

      return newBrief;
    } catch (error) {
      Exception(error.message);
    }
  }
}
