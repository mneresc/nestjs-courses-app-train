import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class SigupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    password: string;
}