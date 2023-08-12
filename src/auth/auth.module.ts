import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/users/schemas/schemas.users';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]), 
    PassportModule, 
    JwtModule.register({secret: process.env.JWT_SECRET, signOptions: {expiresIn: process.env.JWT_EXPIRATION}})
  ],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
