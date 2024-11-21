import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // Função para registrar um novo usuário
    async register(createUserDto: { nome: string; email: string; senha: string }) {
        const { nome, email, senha } = createUserDto;

        const userExists = await this.usersService.findUserByEmail(email);
        if (userExists) {
            throw new BadRequestException('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = await this.usersService.createUser(nome, email, hashedPassword);

        return { message: 'Conta criada com sucesso!' };
    }

    // Função de login
    async login(loginDto: { email: string; senha: string }) {
        const { email, senha } = loginDto;

        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const passwordMatches = await bcrypt.compare(senha, user.senha);
        if (!passwordMatches) {
            throw new BadRequestException('Senha incorreta');
        }

        // Gerando o token JWT
        const payload = { id: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });

        return {
            message: 'Login realizado com sucesso!',
            access_token: accessToken,
        };
    }

    // Função para trocar a senha
    async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const passwordMatches = await bcrypt.compare(oldPassword, user.senha);
        if (!passwordMatches) {
            throw new BadRequestException('Senha antiga incorreta');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.senha = hashedNewPassword;
        await this.usersService.save(user);

        return { message: 'Senha alterada com sucesso!' };
    }

    // Função para deletar um usuário
    async deleteUser(userId: number): Promise<{ message: string }> {

        const user = await this.usersService.findOne(userId);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        await this.usersService.remove(user);

        return { message: 'Usuário deletado com sucesso!' };
    }
}
