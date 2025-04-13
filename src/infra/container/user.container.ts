import { CreateAccountUseCase } from "../../app/use-cases/account/create.usecase";
import { CreateUserUseCase } from "../../app/use-cases/user/create.usecase";
import { FindAllUsersUseCase } from "../../app/use-cases/user/find-all.usecase";
import { UserController } from "../../interfaces/controllers/user/user.controller";
import { FakeRepoAccount } from "../db/Fake/account.repository";
import { FakeRepoUser } from "../db/Fake/user.repository";

const fakeAccountRepo = new FakeRepoAccount();
const fakeUserRepo = new FakeRepoUser();

const createAccountUseCase = new CreateAccountUseCase(fakeAccountRepo);

const createUserUseCase = new CreateUserUseCase(
	fakeUserRepo,
	createAccountUseCase,
);

const findAllUsersUseCase = new FindAllUsersUseCase(fakeUserRepo);

export const userController = new UserController(
	createUserUseCase,
	findAllUsersUseCase,
);
