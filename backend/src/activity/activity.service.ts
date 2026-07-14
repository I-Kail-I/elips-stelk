import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ResponseActivityDto } from './dto/response-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

interface FindAllParams {
  limit?: number;
  sort?: string;
  order?: string;
}

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto): Promise<ResponseActivityDto> {
    const { image, ...rest } = createActivityDto;
    return this.prisma.activity.create({
      data: { ...rest, image: image ?? [] },
    });
  }

  async findAll(params?: FindAllParams): Promise<ResponseActivityDto[]> {
    const { limit, sort, order } = params ?? {};

    const orderBy: Prisma.ActivityOrderByWithRelationInput = {};
    if (sort != null) {
      (orderBy as Record<string, string>)[sort] = order ?? 'desc';
    } else {
      orderBy.created_at = 'desc';
    }

    return this.prisma.activity.findMany({
      orderBy,
      ...(limit != null ? { take: limit } : {}),
    });
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
