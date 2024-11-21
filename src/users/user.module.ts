import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';  // A entidade Users

@Module({
    imports: [TypeOrmModule.forFeature([Users])],  // Registra a entidade Users
    exports: [TypeOrmModule],  // Exporte o TypeOrmModule caso precise usar em outros módulos
})
export class UsersModule { }
