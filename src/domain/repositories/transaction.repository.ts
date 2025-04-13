import type { Transaction } from "../entities/transaction.entity";

export interface ITransactionRepository {
	save(transaction: Transaction): Promise<void>;
	findById(id: string): Promise<Transaction | null>;
	findAllTransactionsByAccountNumber(
		account_number: number,
	): Promise<Transaction[]>;
}
