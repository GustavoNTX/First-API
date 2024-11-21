import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,  // Certifique-se de que a chave secreta está configurada corretamente
        });
    }

    async validate(payload: JwtPayload) {
        // Validar se o usuário existe no banco com base no ID presente no payload do JWT
        const user = await this.usersService.findOne(payload.id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
