import { UserRepository } from "@/account/domain/repositories/UserRepository";
import { Injectable } from "@nestjs/common";
import { User } from "@/account/domain/entities/User";
import { PrismaService } from "@/shared/infrastructure/database/PrismaService";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: User): Promise<User> {
        if (!user.getPassword()) throw new Error('Password is required to create a user');
        const row = await this.prisma.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword() as string,
            }
        });
        return new User({
            id: row.id.toString(),
            name: row.name,
            email: row.email,
        });
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!row) return null;

        return new User({
            id: row.id.toString(),
            name: row.name,
            email: row.email,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!row) return null;

        return new User({
            id: row.id.toString(),
            name: row.name,
            email: row.email,
            password: row.password,
        });
    }
}