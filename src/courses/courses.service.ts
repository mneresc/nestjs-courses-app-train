import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourse } from './dto/course.dto';

@Injectable()
export class CoursesService {

constructor(
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>,
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>
) {

}

async  findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['tags']
    });
  }


  async  findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({select: ['id','name','description','price','tags'], where: {id}, relations: ['tags']});
    if(!course){
      throw new NotFoundException('Course not found');
    }

    return course;
      
  }

  async  create(body: CreateCourse){
    const tags = await Promise.all(body.tags.map(tag => this.preloadTagByName(tag)));
    const course =  await this.courseRepository.create({...body, tags});
    return this.courseRepository.save(course);  
  }

  async  update(id: string, body: Course){
    await this.removeTagsFromCourse(body);
    const tags = await Promise.all(body.tags.map(tag => this.preloadTagByName(tag.name)));
    const course =  await this.courseRepository.preload({id, ...body, tags});

    if(!course){
      throw new NotFoundException('Course not found');
    }
   return this.courseRepository.save(course);  
      
  }

  async  remove(id: string){
    const course = await this.courseRepository.findOne({where: {id}});

    if(!course){
      throw new NotFoundException('Course not found');
    }
    
    return this.courseRepository.remove(course);
      
  }

  private async preloadTagByName(name: string): Promise<Tag>{
    const tag = await this.tagRepository.findOne({where:{name}});
    if(tag){
      return tag;
    }
    return this.tagRepository.create({name});
  }

  /** @TODO remover tags relacionadas antes de inserir novas */
  private async removeTagsFromCourse(course: Course){
    const courseUpdate =  await this.courseRepository.preload({...course, tags: []});
    return this.courseRepository.save(courseUpdate);
  }
  
}
