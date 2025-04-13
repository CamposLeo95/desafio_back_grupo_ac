import { CreateAccountUseCase } from "../../app/use-cases/account/create.usecase";
import { CreateUserUseCase } from "../../app/use-cases/user/create.usecase";
import { FindAllUsersUseCase } from "../../app/use-cases/user/find-all.usecase";
import { UserController } from "../../interfaces/controllers/user/user.controller";
import { RepoAccountTeste } from "../db/prisma/account.repository";
import { RepoUserTeste } from "../db/prisma/user.repository";

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
