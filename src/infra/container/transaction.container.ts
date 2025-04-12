import { CreateTransactionUseCase } from "../../app/use-cases/transaction/create.usecase";
import type { Transaction } from "../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../domain/repositories/transaction.repository";
import { TransactionController } from "../../interfaces/controllers/transaction/transaction.controller";
import { AppError } from "../../shared/exceptions/app-error";

const dbTransaction: Transaction[] = [];

export class RepoTransactionTeste implements ITransactionRepository {
	async save(transaction: Transaction): Promise<void> {
		dbTransaction.push(transaction);
	}
}

const repoTeste = new RepoTransactionTeste();

const createTransactionUseCase = new CreateTransactionUseCase(repoTeste);

export const transactionController = new TransactionController(
	createTransactionUseCase,
);
