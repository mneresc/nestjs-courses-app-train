import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(), CoursesModule, TypeOrmModule.forRoot(
   {
    type: process.env.TYPEORM_CONNECTION || "postgres" as any,
    host: process.env.HOST || "localhost" as any,
    port: process.env.PORT || "5432" as any,
    username: process.env.USERNAME || "postgres" as any,
    password: process.env.PASSWORD || "postgres" as any,
    database: process.env.DATABASE || "postgres" as any,
    autoLoadEntities: process.env.AUTOLOADENTITIES || true as any,
    synchronize: process.env.SYNCHRONIZE || true as any,
   }
  )],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
