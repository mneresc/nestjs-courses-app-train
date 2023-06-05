import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';

const courses: Course[] = [{
  "id": "aa535a29-09d7-4d45-894a-a5ea258f4a07",
  "name": "Fitoterapia",
  "description":"Curso livre de Fitoterapia",
  "price":50,
  "tags":["saúde","bem-estar"]
}];

@Injectable()
export class CoursesService {

async  findAll(): Promise<Course[]> {
    return courses;
  }


  async  findOne(id: string): Promise<Course> {
    const course = courses.filter((course : Course) => course.id === id)[0];
    if(!course){
      throw new NotFoundException('Course not found');
    }

    return course;
      
  }

  async  create(body: Course){
    courses.push(body);
    return body;  
  }

  async  update(id: string, body: Course){
    const coursePosition = courses.findIndex((course : Course) => course.id === id);

    if(coursePosition === -1){
      throw new NotFoundException('Course not found');
    }
    courses[coursePosition] = body;
    return courses[coursePosition];
      
  }

  async  remove(id: string){
    const coursePosition = courses.findIndex((course : Course) => course.id === id);

    if(coursePosition === -1){
      throw new NotFoundException('Course not found');
    }
    courses.splice(coursePosition,1);
    return courses;
      
  }

  
}
