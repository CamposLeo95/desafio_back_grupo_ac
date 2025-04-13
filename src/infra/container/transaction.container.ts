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
import "dotenv/config";
import { PrismaRepoAccount } from "../db/prisma/account.repository";
import { PrismaRepoRequestReversal } from "../db/prisma/request-reversal.repository";
import { PrismaRepoTransaction } from "../db/prisma/transaction.repository";
const FAKE_DB = process.env.FAKE_DB;

const fakeRepoAccount = new FakeRepoAccount();
const fakeRepoTransaction = new FakeRepoTransaction();
const fakerRepoRequestReversal = new FakeRepoRequestReversal();

const prismaRepoAccount = new PrismaRepoAccount();
const prismaRepoTransaction = new PrismaRepoTransaction();
const prismaRepoRequestReversal = new PrismaRepoRequestReversal();

const activeRepoTransiction =
	FAKE_DB === "true" ? fakeRepoTransaction : prismaRepoTransaction;

const activeRepoAccount =
	FAKE_DB === "true" ? fakeRepoAccount : prismaRepoAccount;

const activeRepoRequestReversal =
	FAKE_DB === "true" ? fakerRepoRequestReversal : prismaRepoRequestReversal;

const creditAccountUseCase = new CreditAccountUseCase(activeRepoAccount);
const debitAccountUseCase = new DebitAccountUseCase(activeRepoAccount);
const approvedRequestReversalUseCase = new ApprovedRequestReversalUseCase(
	activeRepoRequestReversal,
);
const createTransactionUseCase = new CreateTransactionUseCase(
	activeRepoTransiction,
	activeRepoAccount,
	creditAccountUseCase,
	debitAccountUseCase,
);
const findAllSendTransactionByAccountUseCase =
	new FindAllSendTransactionByAccountUseCase(activeRepoTransiction);
const reversalTransactionUseCase = new ReversalTransactionUseCase(
	activeRepoTransiction,
	activeRepoAccount,
	creditAccountUseCase,
	debitAccountUseCase,
	approvedRequestReversalUseCase,
);

export const transactionController = new TransactionController(
	createTransactionUseCase,
	reversalTransactionUseCase,
	findAllSendTransactionByAccountUseCase,
);
