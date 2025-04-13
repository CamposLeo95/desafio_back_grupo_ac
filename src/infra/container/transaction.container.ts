import { CreditAccountUseCase } from "../../app/use-cases/account/credit.usecase";
import { DebitAccountUseCase } from "../../app/use-cases/account/debit.usecase";
import { ApprovedRequestReversalUseCase } from "../../app/use-cases/request-reversal/approved-request-reversal.usecase";
import { CreateTransactionUseCase } from "../../app/use-cases/transaction/create.usecase";
import { FindAllSendTransactionByAccountUseCase } from "../../app/use-cases/transaction/find-all-by-account.usecase";
import { ReversalTransactionUseCase } from "../../app/use-cases/transaction/reversal.usecase";
import { TransactionController } from "../../interfaces/controllers/transaction/transaction.controller";
import { FakeRepoAccount } from "../db/Fake/account.repository";
import { FakeRepoRequestReversal } from "../db/Fake/request-reversal.repository";
import { FakeRepoTransaction } from "../db/Fake/transaction.repository";

const fakeRepoAccount = new FakeRepoAccount();
const fakeRepoTransaction = new FakeRepoTransaction();
const fakerRepoRequestReversal = new FakeRepoRequestReversal();

const creditAccountUseCase = new CreditAccountUseCase(fakeRepoAccount);
const debitAccountUseCase = new DebitAccountUseCase(fakeRepoAccount);
const approvedRequestReversalUseCase = new ApprovedRequestReversalUseCase(
	fakerRepoRequestReversal,
);
const createTransactionUseCase = new CreateTransactionUseCase(
	fakeRepoTransaction,
	fakeRepoAccount,
	creditAccountUseCase,
	debitAccountUseCase,
);
const findAllSendTransactionByAccountUseCase =
	new FindAllSendTransactionByAccountUseCase(fakeRepoTransaction);
const reversalTransactionUseCase = new ReversalTransactionUseCase(
	fakeRepoTransaction,
	fakeRepoAccount,
	creditAccountUseCase,
	debitAccountUseCase,
	approvedRequestReversalUseCase,
);

export const transactionController = new TransactionController(
	createTransactionUseCase,
	reversalTransactionUseCase,
	findAllSendTransactionByAccountUseCase,
);
