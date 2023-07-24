import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString , IsOptional} from "class-validator";

export class Course {
  id?: string;
  name: string;
  description: string;
  price?: number;
  tags?:string[];
}

export class CreateCourse {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price?: number;
  
  @IsOptional()
  @IsString({each:true})
  readonly tags?:string[];
}


export class UpdateCourse extends PartialType(CreateCourse) {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;
}