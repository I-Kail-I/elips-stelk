import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ResponseActivityDto } from './dto/response-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto): Promise<ResponseActivityDto> {
    return this.prisma.activity.create({
      data: { ...createActivityDto },
    });
  }

  async findAll(): Promise<ResponseActivityDto[]> {
    return this.prisma.activity.findMany();
  }

  async findOne(id: number): Promise<ResponseActivityDto> {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException('Activity tidak ditemukan');
    }

    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto): Promise<ResponseActivityDto> {
    await this.findOne(id);

    return this.prisma.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: number): Promise<ResponseActivityDto> {
    await this.findOne(id);

    return this.prisma.activity.delete({
      where: { id },
    });
  }
}
