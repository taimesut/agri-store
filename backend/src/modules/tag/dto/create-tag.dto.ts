import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateTagDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Trim()
  name: string;
}
