import { ApiProperty } from '@nestjs/swagger';

export class CreateBriefDto {

  @ApiProperty()
  briefCode: string;
  
  @ApiProperty()
  phase: string;

  @ApiProperty()
  processingStep: string;

  @ApiProperty()
  product: string;

  @ApiProperty()
  progress: string;
}
