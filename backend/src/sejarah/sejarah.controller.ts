import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateSejarahDto } from './dto/create-sejarah.dto';
import { UpdateSejarahDto } from './dto/update-sejarah.dto';
import { SejarahService } from './sejarah.service';

@Controller('sejarah')
export class SejarahController {
  constructor(private readonly sejarahService: SejarahService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSejarahDto: CreateSejarahDto) {
    return this.sejarahService.create(createSejarahDto);
  }

  @Get()
  async findAll() {
    return this.sejarahService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sejarahService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSejarahDto: UpdateSejarahDto) {
    return this.sejarahService.update(+id, updateSejarahDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sejarahService.remove(+id);
  }
}
