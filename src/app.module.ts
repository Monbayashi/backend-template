import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from '@modules/user-management/user-management.module';
import { PrismaClientManagerModule } from './libs/prisma-client-manager/prisma-client-manager.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guard/jwt-guard';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    PrismaClientManagerModule,
    JwtModule.register({
      global: true,
      secret: 'secretKey', // 本番環境ではより安全な方法でシークレットキーを管理してください(env)
      signOptions: { expiresIn: '1d' },
    }),
    //　Modules
    UserManagementModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
