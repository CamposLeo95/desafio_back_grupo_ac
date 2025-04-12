import { CreditAccountUseCase } from "../../app/use-cases/account/credit.usecase";
import { FindByIdAccountUseCase } from "../../app/use-cases/account/find-by-id.usecase";
import { AccountController } from "../../interfaces/controllers/account/account.controller";
import { RepoAccountTeste } from "../db/prisma/account.repository";

const accoutRepoTeste = new RepoAccountTeste();

const creditAccountUseCase = new CreditAccountUseCase(accoutRepoTeste);
const findByIdAccountUseCase = new FindByIdAccountUseCase(accoutRepoTeste);

export const accountController = new AccountController(
	creditAccountUseCase,
	findByIdAccountUseCase,
);
