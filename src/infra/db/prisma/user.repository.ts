import type { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";
import { prisma } from "../config/prisma-client";

export class PrismaRepoUser implements IUserRepository {
	async findAll(): Promise<User[]> {
		return prisma.users.findMany();
	}

	async save(user: User): Promise<void> {
		await prisma.users.create({
			data: {
				id: user.id,
				name: user.name,
				cpf: user.cpf,
				email: user.email,
				password: user.password,
				admin: user.admin,
				created_at: user.created_at,
			},
		});
	}

	async findById(id: string): Promise<User | null> {
		return prisma.users.findUnique({
			where: { id },
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return prisma.users.findUnique({
			where: { email },
		});
	}

	async findByCpf(cpf: string): Promise<User | null> {
		return prisma.users.findUnique({
			where: { cpf },
		});
	}
}
