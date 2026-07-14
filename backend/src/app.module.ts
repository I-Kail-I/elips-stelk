import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { MorganMiddleware } from './common/middleware/morgan.middleware';
import { PrismaModule } from './common/prisma/prisma.module';
import { FilesController } from './files/files.controller';
import { HealthController } from './health/health.controller';
import { MemberModule } from './member/member.module';
import { UserModule } from './user/user.module';
import { isProduction } from './utils/check-env';
import { VisiDanMisiModule } from './visi-dan-misi/visi-dan-misi.module';

@Module({
  imports: [
    // Rate limiting (10 requests per 60s window)
    ThrottlerModule.forRoot([
      isProduction
        ? {
            ttl: 60000,
            limit: 10,
          }
        : {
            ttl: 1000,
            limit: 100,
          },
    ]),

    // Structured logging (Pino + Morgan)
    LoggerModule.forRoot({
      pinoHttp: {
        transport: isProduction
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss',
              },
            },
        autoLogging: false,
      },
    }),

    // Feature modules
    PrismaModule,
    AuthModule,
    MemberModule,
    ActivityModule,
    UserModule,
    VisiDanMisiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [HealthController, FilesController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MorganMiddleware)
      .exclude('api/docs', 'api/docs/(.*)') // Skip Swagger routes
      .forRoutes('*');
  }
}
