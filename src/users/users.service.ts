import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './models/users.model';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { SiginDto } from './dto/signin.dto';
import { SigupDto } from './dto/signup.dto';
import { CredentialDto } from './dto/credential.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async signUp(user: SigupDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  public async signIn(userAuth: SiginDto): Promise<CredentialDto> {
    const user = await this.findByEmail(userAuth.email );
    const passwordMatch = await this.comparePassword(userAuth.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Senha inválida');
    }

    return {name: user.name, jwtToken: await this.authService.createAccessToken(user._id), email: user.email};
  }


  public async findAll(): Promise<User[]> {
    return this.userModel.find({}, {name: 1, email: 1}).exec();
  }

  private async findByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({ email}).exec();

    if(!user){
      throw new UnauthorizedException("Usuário ou senha inválidos");
    }

    return user;
  }
  
  private async comparePassword(userPass: string, dbPass: string): Promise<boolean> {
    const compare = await bcrypt.compare(userPass,dbPass);

    if(!compare){
      throw new UnauthorizedException("Usuário ou senha inválidos");
    }

    return compare;
  }

}