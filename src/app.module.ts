import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [CoursesModule, TypeOrmModule.forRoot(
   {
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.HOST as any,
    port: process.env.PORT as any,
    username: process.env.USERNAME as any,
    password: process.env.PASSWORD as any,
    database: process.env.DATABASE as any,
    autoLoadEntities: process.env.AUTOLOADENTITIES as any,
    synchronize: process.env.SYNCHRONIZE as any,
   }
  )],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
