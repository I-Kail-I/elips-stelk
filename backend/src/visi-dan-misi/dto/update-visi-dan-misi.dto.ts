import { PartialType } from '@nestjs/swagger';
import { CreateVisiDanMisiDto } from './create-visi-dan-misi.dto';

export class UpdateVisiDanMisiDto extends PartialType(CreateVisiDanMisiDto) {}
