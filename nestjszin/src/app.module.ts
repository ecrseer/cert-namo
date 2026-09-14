import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CertificatesModule } from './certificate/certificates.module.js';
import { GabjPingConnections } from './gabj-ping-connections.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ...(process.env.DATABASE_URL
      ? [
          TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres' as const,
              url: configService.getOrThrow<string>('DATABASE_URL'),
              autoLoadEntities: true,
              synchronize: true,
            }),
          }),
        ]
      : []),
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [AppService, GabjPingConnections],
})
export class AppModule {}
