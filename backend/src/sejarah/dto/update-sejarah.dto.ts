import { PartialType } from '@nestjs/swagger';
import { CreateSejarahDto } from './create-sejarah.dto';

export class UpdateSejarahDto extends PartialType(CreateSejarahDto) {}
