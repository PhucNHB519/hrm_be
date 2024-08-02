import { Test, TestingModule } from '@nestjs/testing';
import { BriefController } from './brief.controller';

describe('BriefController', () => {
  let controller: BriefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BriefController],
    }).compile();

    controller = module.get<BriefController>(BriefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
