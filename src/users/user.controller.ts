import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('register')
    async createAccount(
        @Body() body: { nome: string; email: string; senha: string },
    ) {
        const { nome, email, senha } = body;
        const user = await this.usersService.createUser(nome, email, senha);
        return { message: 'Conta criada com sucesso!', user };
    }

    @Post('login')
    async login(
        @Body() body: { email: string; senha: string },
    ) {
        const { email, senha } = body;
        const user = await this.usersService.findUserByEmail(email);

        if (!user || user.senha !== senha) {
            return { message: 'Credenciais inválidas' };
        }

        return { message: 'Login bem-sucedido!' };
    }
}
