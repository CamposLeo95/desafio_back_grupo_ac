import type { Transaction } from "../entities/transaction.entity";

export interface ITransactionRepository {
	save(transaction: Transaction): Promise<void>;
}
