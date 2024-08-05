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

@Injectable()
export class BriefService {
  constructor(
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
  ) {}

  paginationAll(
    options: IPaginationOptions,
  ): Observable<Pagination<BriefEntity>> {
    return from(
      paginate<BriefEntity>(this.briefRepository, options, {
        // where: { status: 'active' },
      }),
    ).pipe(map((category: Pagination<BriefEntity>) => category));
  }

  async create(dto: CreateBriefDto) {
    try {
        const newBrief = await this.briefRepository.save({
            briefCode: dto.briefCode,
            createdDate: new Date(),
            sentDate: null,
            endDate: dto.endDate,
            content: dto.content,
            phase: dto.phase,
            processingStep: dto.processingStep,
            product: dto.product,
            progress: dto.progress,
            status: "Chờ xử lý"
        })
        return newBrief;
    } catch (error) {
        Exception(error.message);
    }
  }
}
