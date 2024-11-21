import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async createUser(nome: string, email: string, senha: string): Promise<Users> {
        const user = new Users();
        user.nome = nome;
        user.email = email;
        user.senha = senha;

        return this.usersRepository.save(user);
    }

    async findUserByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOne(id: number): Promise<Users> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async save(user: Users): Promise<Users> {
        return this.usersRepository.save(user);
    }

    async remove(user: Users): Promise<void> {
        await this.usersRepository.remove(user); // Usando o método remove do TypeORM
    }
}
