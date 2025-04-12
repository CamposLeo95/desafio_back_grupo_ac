import type { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";

const dbUsers: User[] = [];

export class RepoUserTeste implements IUserRepository {
	async findAll(): Promise<User[]> {
		return dbUsers;
	}
	async save(user: User): Promise<void> {
		dbUsers.push(user);
	}

	async findById(id: string): Promise<User | null> {
		const user = dbUsers.find((user) => user.id === id);
		return user || null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = dbUsers.find((user) => user.email === email);
		return user || null;
	}

	async findByCpf(cpf: string): Promise<User | null> {
		const user = dbUsers.find((user) => user.cpf === cpf);
		return user || null;
	}
}
