import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateVisiDanMisiDto } from './dto/create-visi-dan-misi.dto';
import { UpdateVisiDanMisiDto } from './dto/update-visi-dan-misi.dto';
import { VisiDanMisiService } from './visi-dan-misi.service';

@Controller('visi-dan-misi')
export class VisiDanMisiController {
  constructor(private readonly visiDanMisiService: VisiDanMisiService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.visiDanMisiService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVisiDanMisiDto: UpdateVisiDanMisiDto) {
    return this.visiDanMisiService.update(+id, updateVisiDanMisiDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.visiDanMisiService.remove(+id);
  }
}
