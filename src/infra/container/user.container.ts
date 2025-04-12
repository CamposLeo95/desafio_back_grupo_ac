import { CreateAccountUseCase } from "../../app/use-cases/account/create.usecase";
import { CreateUserUseCase } from "../../app/use-cases/user/create.usecase";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { UserController } from "../../interfaces/controllers/user/user.controller";

class RepoTeste implements IUserRepository {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async save(account: any): Promise<any> {
		return account;
	}
}

const userRepository = new RepoTeste();

const createAccountUseCase = new CreateAccountUseCase(userRepository);

const createUserUseCase = new CreateUserUseCase(
	userRepository,
	createAccountUseCase,
);

export const userController = new UserController(createUserUseCase);
