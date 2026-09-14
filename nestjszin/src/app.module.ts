import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CertidoesModule } from './certidao/certidoes.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ...(process.env.DATABASE_URL
      ? [
          TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres' as const,
              url: configService.getOrThrow<string>('DATABASE_URL'),
              autoLoadEntities: true,
              synchronize: false,
            }),
          }),
        ]
      : []),
    CertidoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
