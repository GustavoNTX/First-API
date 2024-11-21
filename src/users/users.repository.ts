import { EntityRepository, Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {

    async findByEmail(email: string): Promise<Users | undefined> {
        return this.findOne({ where: { email } });
    }

    async comparePassword(storedPassword: string, providedPassword: string): Promise<boolean> {
        return bcrypt.compare(providedPassword, storedPassword);
    }

    async changePassword(userId: number, newPassword: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.update(userId, { senha: hashedPassword });
    }
}
