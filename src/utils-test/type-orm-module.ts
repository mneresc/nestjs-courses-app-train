import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../src/courses/entities/course.entity';
import { Tag } from '../../src/courses/entities/tags.entity';


export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Course, Tag],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Course, Tag]),
];