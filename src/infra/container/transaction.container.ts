import { CreateTransactionUseCase } from "../../app/use-cases/transaction/create.usecase";
import { TransactionController } from "../../interfaces/controllers/transaction/transaction.controller";
import { RepoTransactionTeste } from "../db/prisma/transaction.repository";

const repoTeste = new RepoTransactionTeste();

const createTransactionUseCase = new CreateTransactionUseCase(repoTeste);

export const transactionController = new TransactionController(
	createTransactionUseCase,
);
