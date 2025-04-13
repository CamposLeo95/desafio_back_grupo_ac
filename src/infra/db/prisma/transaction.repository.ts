import type { Transaction } from "../../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";

const dbTransaction: Transaction[] = [];

export class RepoTransactionTeste implements ITransactionRepository {
	async findById(id: string): Promise<Transaction | null> {
		const transition = dbTransaction.find(
			(transaction) => transaction.id === id,
		);
		if (!transition) {
			return null;
		}
		return transition;
	}

	async save(transaction: Transaction): Promise<void> {
		dbTransaction.push(transaction);
	}

	async findAllTransactionsByAccountNumber(
		account_number: number,
	): Promise<Transaction[]> {
		return dbTransaction.filter(
			(transaction) =>
				transaction.from_account_number === account_number ||
				transaction.to_account_number === account_number,
		);
	}
}
