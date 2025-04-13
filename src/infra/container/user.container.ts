import { CreateAccountUseCase } from "../../app/use-cases/account/create.usecase";
import { CreateUserUseCase } from "../../app/use-cases/user/create.usecase";
import { FindAllUsersUseCase } from "../../app/use-cases/user/find-all.usecase";
import { UserController } from "../../interfaces/controllers/user/user.controller";
import { FakeRepoAccount } from "../db/Fake/account.repository";
import { FakeRepoUser } from "../db/Fake/user.repository";
import "dotenv/config";
import { PrismaRepoAccount } from "../db/prisma/account.repository";
import { PrismaRepoUser } from "../db/prisma/user.repository";
const FAKE_DB = process.env.FAKE_DB;

const fakeAccountRepo = new FakeRepoAccount();
const fakeUserRepo = new FakeRepoUser();

const prismaRepoAccount = new PrismaRepoAccount();
const prismaRepoUser = new PrismaRepoUser();

const activeRepoAccount =
	FAKE_DB === "true" ? fakeAccountRepo : prismaRepoAccount;

const activeRepoUser = FAKE_DB === "true" ? fakeUserRepo : prismaRepoUser;

const createAccountUseCase = new CreateAccountUseCase(activeRepoAccount);

const createUserUseCase = new CreateUserUseCase(
	activeRepoUser,
	createAccountUseCase,
);

const findAllUsersUseCase = new FindAllUsersUseCase(activeRepoUser);

export const userController = new UserController(
	createUserUseCase,
	findAllUsersUseCase,
);
