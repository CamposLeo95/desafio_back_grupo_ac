import "dotenv/config";
import { CreditAccountUseCase } from "../../app/use-cases/account/credit.usecase";
import { FindAllAccountUseCase } from "../../app/use-cases/account/find-all.usecase";
import { FindByIdAccountUseCase } from "../../app/use-cases/account/find-by-id.usecase";
import { AccountController } from "../../interfaces/controllers/account/account.controller";
import { FakeRepoAccount } from "../db/Fake/account.repository";
import { PrismaRepoAccount } from "../db/prisma/account.repository";

const FAKE_DB = process.env.FAKE_DB;
const fakeRepoAccount = new FakeRepoAccount();
const prismaRepoAccount = new PrismaRepoAccount();

const activeRepoAccount =
	FAKE_DB === "true" ? fakeRepoAccount : prismaRepoAccount;

const creditAccountUseCase = new CreditAccountUseCase(activeRepoAccount);
const findByIdAccountUseCase = new FindByIdAccountUseCase(activeRepoAccount);
const findAllAccountUseCase = new FindAllAccountUseCase(activeRepoAccount);

export const accountController = new AccountController(
	creditAccountUseCase,
	findByIdAccountUseCase,
	findAllAccountUseCase,
);
