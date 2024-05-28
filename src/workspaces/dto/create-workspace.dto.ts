import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkSpaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Slack',
    description: 'Worksapce Name',
  })
  public workspace: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sleact',
    description: 'url address',
  })
  public url: string;
}
