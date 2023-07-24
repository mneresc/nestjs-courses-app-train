import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tags.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price?: number;

    @ManyToMany(() => Tag, (tag) => tag.courses, {cascade: true})
    @JoinTable()
    tags: Tag[]
  }