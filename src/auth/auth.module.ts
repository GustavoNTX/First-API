import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,  // Chave secreta para assinar o token
      signOptions: { expiresIn: '1h' },  // Definindo a expiração do token
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService, UsersService],
})
export class AuthModule { }
