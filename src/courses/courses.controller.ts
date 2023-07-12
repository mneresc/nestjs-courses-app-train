import { Body, Controller, Delete, Get , HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourse } from './dto/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly appService: CoursesService) {}

  @Get('/')
  async findAll(): Promise<Course[]> {
    return await this.appService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Course>  {
    return await this.appService.findOne(id);

  }

  @Post('/')
  async create(@Body() body: CreateCourse): Promise<Course>  {
    return await this.appService.create(body);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body): Promise<Course> {
    return await this.appService.update(id,body);
  }

  @Put('/:id')
  async replace(@Param('id') id: string, @Body() body: Course): Promise<Course> {
    return await this.appService.update(id,body);

  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
     return await this.appService.remove(id);
  }
}
