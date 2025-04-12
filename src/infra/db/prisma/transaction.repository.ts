import type { Transaction } from "../../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";

const dbTransaction: Transaction[] = [];

export class RepoTransactionTeste implements ITransactionRepository {
	async save(transaction: Transaction): Promise<void> {
		dbTransaction.push(transaction);
	}
}
