import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/schemas.users';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  public async createAccessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  public async validateUser(userId: JwtPayload): Promise<User> {
    const user = this.userModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }

  private static jwtExtractor(request: Request): string {
    if (!request.headers.authorization) {
      throw new BadRequestException('Cabeçalho de autorização não encontrado');
    }

    const [, token] = request.headers.authorization.split(' ');

    return token;
  }

  public getJwsExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }
}
