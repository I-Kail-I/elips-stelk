import type { User } from '@/generated/prisma/client';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UserProfileDto, UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: { user: User }): Promise<UserProfileDto> {
    return this.userService.getProfile(req.user.id);
  }
}
