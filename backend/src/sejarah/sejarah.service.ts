import type { ResponseSejarahDto } from './dto/response-sejarah.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateSejarahDto } from './dto/create-sejarah.dto';
import { UpdateSejarahDto } from './dto/update-sejarah.dto';

@Injectable()
export class SejarahService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSejarahDto: CreateSejarahDto): Promise<ResponseSejarahDto> {
    return this.prisma.sejarah.create({
      data: createSejarahDto,
    });
  }

  async findAll(): Promise<ResponseSejarahDto[]> {
    return this.prisma.sejarah.findMany();
  }

  async findOne(id: number): Promise<ResponseSejarahDto> {
    const sejarah = await this.prisma.sejarah.findFirst({
      where: { id },
    });

    if (!sejarah) {
      throw new NotFoundException('Sejarah tidak ditemukan');
    }

    return sejarah;
  }

  async update(id: number, updateSejarahDto: UpdateSejarahDto): Promise<ResponseSejarahDto> {
    await this.findOne(id);

    return this.prisma.sejarah.update({
      where: { id },
      data: updateSejarahDto,
    });
  }

  async remove(id: number): Promise<ResponseSejarahDto> {
    await this.findOne(id);

    return this.prisma.sejarah.delete({
      where: { id },
    });
  }
}
