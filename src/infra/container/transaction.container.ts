import { CreditAccountUseCase } from "../../app/use-cases/account/credit.usecase";
import { DebitAccountUseCase } from "../../app/use-cases/account/debit.usecase";
import { CreateTransactionUseCase } from "../../app/use-cases/transaction/create.usecase";
import { FindAllSendTransactionByAccountUseCase } from "../../app/use-cases/transaction/find-all-by-account.usecase";
import { ReversalTransactionUseCase } from "../../app/use-cases/transaction/reversal.usecase";
import { TransactionController } from "../../interfaces/controllers/transaction/transaction.controller";
import { RepoAccountTeste } from "../db/prisma/account.repository";
import { RepoTransactionTeste } from "../db/prisma/transaction.repository";

const repoTeste = new RepoTransactionTeste();
const repoAccountTeste = new RepoAccountTeste();

const creditAccountUseCase = new CreditAccountUseCase(repoAccountTeste);
const debitAccountUseCase = new DebitAccountUseCase(repoAccountTeste);

const createTransactionUseCase = new CreateTransactionUseCase(
	repoTeste,
	repoAccountTeste,
	creditAccountUseCase,
	debitAccountUseCase,
);

const findAllSendTransactionByAccountUseCase =
	new FindAllSendTransactionByAccountUseCase(repoTeste);

const reversalTransactionUseCase = new ReversalTransactionUseCase(
	repoTeste,
	createTransactionUseCase,
);

export const transactionController = new TransactionController(
	createTransactionUseCase,
	reversalTransactionUseCase,
	findAllSendTransactionByAccountUseCase,
);
