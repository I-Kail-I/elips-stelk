import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateVisiDanMisiDto } from './dto/create-visi-dan-misi.dto';
import { ResponseVisiDanMisiDto } from './dto/response-visi-dan-misi.dto';
import { UpdateVisiDanMisiDto } from './dto/update-visi-dan-misi.dto';

@Injectable()
export class VisiDanMisiService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisiDanMisiDto: CreateVisiDanMisiDto): Promise<ResponseVisiDanMisiDto> {
    return this.prisma.visi_dan_misi.create({
      data: { ...createVisiDanMisiDto },
    });
  }

  async findAll(): Promise<ResponseVisiDanMisiDto[]> {
    return this.prisma.visi_dan_misi.findMany();
  }

  async findOne(id: number): Promise<ResponseVisiDanMisiDto> {
    const result = await this.prisma.visi_dan_misi.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Visi dan Misi dengan id: `);
    }

    return result;
  }

  async update(
    id: number,
    updateVisiDanMisiDto: UpdateVisiDanMisiDto,
  ): Promise<ResponseVisiDanMisiDto> {
    await this.findOne(id);

    return this.prisma.visi_dan_misi.update({
      where: { id },
      data: { ...updateVisiDanMisiDto },
    });
  }

  async findActive(): Promise<ResponseVisiDanMisiDto> {
    const result = await this.prisma.visi_dan_misi.findFirst({
      where: { is_active: true },
      orderBy: { created_at: 'desc' },
    });

    if (!result) {
      throw new NotFoundException('Visi dan Misi tidak ditemukan');
    }

    return result;
  }

  async remove(id: number): Promise<ResponseVisiDanMisiDto> {
    await this.findOne(id);

    return this.prisma.visi_dan_misi.delete({
      where: { id },
    });
  }
}
