import { Body, Controller, Get, Post, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BriefService } from '../service/brief.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateBriefDto } from '../dto/createBrief.request.dto';

export const BRIEF_URL = 'http://localhost:3000/brief';

@ApiTags('Brief')
@Controller('brief')
export class BriefController {
  constructor(private briefService: BriefService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;

    return this.briefService.paginationAll({
      limit: Number(limit),
      page: Number(page),
      route: BRIEF_URL,
    });
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  createBrief(@Request() req, @Body() dto: CreateBriefDto) {
    const user = req.user;
    return this.briefService.create(user, dto);
  }
}
