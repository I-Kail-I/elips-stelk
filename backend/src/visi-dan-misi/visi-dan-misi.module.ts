import { Module } from '@nestjs/common';
import { VisiDanMisiController } from './visi-dan-misi.controller';
import { VisiDanMisiService } from './visi-dan-misi.service';

@Module({
  controllers: [VisiDanMisiController],
  providers: [VisiDanMisiService],
})
export class VisiDanMisiModule {}
