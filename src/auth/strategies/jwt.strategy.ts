import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { Strategy } from "passport-jwt";
import { User } from "src/users/schemas/schemas.users";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: authService.getJwsExtractor(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

  async validate(payload: JwtPayload) : Promise<User>{
    const user =  this.authService.validateUser(payload.userId);

    if(!user){
      throw new UnauthorizedException("Usuário não encontrado");
    }
    return user;
  } 
}