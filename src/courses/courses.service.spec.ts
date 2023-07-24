import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Course as CourseType, CreateCourse } from './dto/course.dto';
import { Connection, Not, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course as CourseEntity } from './entities/course.entity';
import { Tag as TagEntity } from './entities/tags.entity';
import { NotFoundException } from '@nestjs/common';


type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockRepository<CourseEntity>;
  let id;
  let date;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(CourseEntity), useValue: createMockRepository()},
        { provide: getRepositoryToken(TagEntity), useValue: createMockRepository()},
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository<CourseEntity>>(getRepositoryToken(CourseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a course', async () => {
       const courseId = '1';
       const expected = '1';

       courseRepository.findOne.mockReturnValue(expected);
       const result = await service.findOne(courseId);

       expect(result).toEqual(expected);


    });

    it('should return a not found', async () => {
      
      const courseId = '1';

      courseRepository.findOne.mockReturnValue(undefined);

      expect(() => service.findOne(courseId)).rejects.toThrowError('Course not found');
      expect(() => service.findOne(courseId)).rejects.toThrowError(NotFoundException);

    });
  });
});
