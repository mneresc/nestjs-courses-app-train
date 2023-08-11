import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPE || ('postgres' as any),
      host: process.env.HOST || ('localhost' as any),
      port: process.env.PORT || ('5432' as any),
      username: process.env.USERNAME_DB || ('postgres' as any),
      password: process.env.PASSWORD || ('postgres' as any),
      database: process.env.DATABASE || ('postgres' as any),
      autoLoadEntities: process.env.AUTOLOADENTITIES || (true as any),
      synchronize: process.env.SYNCHRONIZE || (true as any),
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth'),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env'
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

console.log({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  autoLoadEntities: process.env.AUTOLOADENTITIES,
  synchronize: process.env.SYNCHRONIZE,
});