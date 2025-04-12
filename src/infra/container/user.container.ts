import { CreateAccountUseCase } from "../../app/use-cases/account/create.usecase";
import { CreateUserUseCase } from "../../app/use-cases/user/create.usecase";
import { FindAllUsersUseCase } from "../../app/use-cases/user/find-all.usecase";
import type { Account } from "../../domain/entities/account.entity";
import type { User } from "../../domain/entities/user.entity";
import type { IAccountRepository } from "../../domain/repositories/account.repository";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { UserController } from "../../interfaces/controllers/user/user.controller";

const dbUsers: User[] = [];
const dbAccount: Account[] = [];

class RepoUserTeste implements IUserRepository {
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

class RepoAccountTeste implements IAccountRepository {
	async findAll(): Promise<Account[]> {
		return dbAccount;
	}
	async save(account: Account): Promise<void> {
		dbAccount.push(account);
	}
}

const userRepository = new RepoUserTeste();
const accountRepository = new RepoAccountTeste();

const createAccountUseCase = new CreateAccountUseCase(accountRepository);

const createUserUseCase = new CreateUserUseCase(
	userRepository,
	createAccountUseCase,
);

const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

export const userController = new UserController(
	createUserUseCase,
	findAllUsersUseCase,
);
