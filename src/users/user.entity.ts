import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';

@Entity('tbUsuarios')  // Alterado para usar o nome correto da tabela
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;  // Nome do usuário

    @Column({ unique: true })
    email: string;  // Email do usuário (único)

    @Column()
    senha: string;  // Senha criptografada
}
