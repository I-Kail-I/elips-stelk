import type { Response } from 'express';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email-password')
  async register(@Body() createAuthDto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.register(createAuthDto);
    res.cookie('access_token', token, COOKIE_OPTIONS);
    return { user };
  }

  @Post('login/email-password')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.login(loginDto);
    res.cookie('access_token', token, COOKIE_OPTIONS);
    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });
    return { message: 'Logged out successfully' };
  }

  @Delete('delete/:email')
  async remove(@Param('email') email: string) {
    return this.authService.remove(email);
  }
}
