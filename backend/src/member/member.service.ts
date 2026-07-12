import type { ResponseMemberDto } from './dto/response-member.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto): Promise<ResponseMemberDto> {
    return this.prisma.member.create({
      data: { ...createMemberDto },
    });
  }

  async findAll() {
    return this.prisma.member.findMany();
  }

  async findOne(id: number): Promise<ResponseMemberDto> {
    const member = await this.prisma.member.findFirst({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member tidak ditemukan');
    }

    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<ResponseMemberDto> {
    await this.findOne(id);

    return this.prisma.member.update({
      where: { id },
      data: { ...updateMemberDto },
    });
  }

  async remove(id: number): Promise<ResponseMemberDto> {
    await this.findOne(id);

    return this.prisma.member.delete({
      where: { id },
    });
  }
}
