import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { after } from 'node:test';
import { TypeOrmSQLITETestingModule } from '../src/utils-test/type-orm-module';
import { v4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../src/courses/entities/course.entity';
import { Tag } from '../src/courses/entities/tags.entity';
import { CoursesModule } from '../src/courses/courses.module';

describe('Courses (e2e)', () => {
  let app: INestApplication;

  const course = {
    name: 'Curso de Esquerda',
    description: 'Curso livre de Fitoterapia',
    price: 50,
    tags: ['umbanda', 'esquerda', 'exu'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          entities: [Course, Tag],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Course, Tag]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  it('Create POST /courses', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(201)
      .then(({ body }) => {
        const expectdCourse: any = {...course}
        delete expectdCourse.tags;
        expect(body.description).toEqual(course.description);
        expect(body.name).toEqual(course.name);
        expect(body.price).toEqual(course.price);
        expect(body.tags).toHaveLength(course.tags.length);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
