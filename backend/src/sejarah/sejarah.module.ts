import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@/auth/auth.module';
import { SejarahController } from './sejarah.controller';
import { SejarahService } from './sejarah.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), AuthModule],
  controllers: [SejarahController],
  providers: [SejarahService],
})
export class SejarahModule {}
