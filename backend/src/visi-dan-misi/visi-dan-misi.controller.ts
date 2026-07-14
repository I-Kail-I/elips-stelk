import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateVisiDanMisiDto } from './dto/create-visi-dan-misi.dto';
import { UpdateVisiDanMisiDto } from './dto/update-visi-dan-misi.dto';
import { VisiDanMisiService } from './visi-dan-misi.service';

@Controller('visi-dan-misi')
export class VisiDanMisiController {
  constructor(private readonly visiDanMisiService: VisiDanMisiService) {}

  @Post()
  async create(@Body() createVisiDanMisiDto: CreateVisiDanMisiDto) {
    return this.visiDanMisiService.create(createVisiDanMisiDto);
  }

  @Get()
  async findAll() {
    return this.visiDanMisiService.findAll();
  }

  @Get('active')
  async findActive() {
    return this.visiDanMisiService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.visiDanMisiService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVisiDanMisiDto: UpdateVisiDanMisiDto) {
    return this.visiDanMisiService.update(+id, updateVisiDanMisiDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.visiDanMisiService.remove(+id);
  }
}
