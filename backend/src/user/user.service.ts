import type { User } from '@/generated/prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

export interface UserProfileDto {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toProfile(user);
  }

  private toProfile(user: User): UserProfileDto {
    return {
      name: `${user.first_name} ${user.last_name}`.trim(),
      email: user.email,
    };
  }
}
