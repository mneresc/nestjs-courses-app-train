import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigupDto } from './dto/signup.dto';
import { User } from './models/users.model';
import { SiginDto } from './dto/signin.dto';
import { CredentialDto } from './dto/credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() payload: SigupDto): Promise<User> {
        return await this.usersService.signUp(payload);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() payload: SiginDto): Promise<CredentialDto> {
        return await this.usersService.signIn(payload);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }
}
