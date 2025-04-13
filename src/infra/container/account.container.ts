import { CreditAccountUseCase } from "../../app/use-cases/account/credit.usecase";
import { FindAllAccountUseCase } from "../../app/use-cases/account/find-all.usecase";
import { FindByIdAccountUseCase } from "../../app/use-cases/account/find-by-id.usecase";
import { AccountController } from "../../interfaces/controllers/account/account.controller";
import { FakeRepoAccount } from "../db/Fake/account.repository";

const fakeRepoAccount = new FakeRepoAccount();

const creditAccountUseCase = new CreditAccountUseCase(fakeRepoAccount);
const findByIdAccountUseCase = new FindByIdAccountUseCase(fakeRepoAccount);
const findAllAccountUseCase = new FindAllAccountUseCase(fakeRepoAccount);

export const accountController = new AccountController(
	creditAccountUseCase,
	findByIdAccountUseCase,
	findAllAccountUseCase,
);
