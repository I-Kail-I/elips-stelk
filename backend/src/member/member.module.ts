import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@/auth/auth.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), AuthModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
