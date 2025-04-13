import type { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";

const dbUsers: User[] = [
	{
		id: "5e582b27-eef1-4a4e-bcf2-263c6a99b8aa",
		name: "Leonardo",
		cpf: "12345678900",
		email: "leonardo@email.com",
		admin: false,
		password: "dasdadas",
		created_at: new Date("2025-04-13T12:08:55.456Z"),
	},
	{
		id: "b0e4c233-91a4-47a6-bcb5-901d80dcec8b",
		name: "Joao",
		cpf: "312312312312",
		email: "joao@email.com",
		admin: false,
		password: "dasdadas",
		created_at: new Date("2025-04-13T12:08:55.456Z"),
	},
];

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
