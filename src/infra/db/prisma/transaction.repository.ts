import type { Transaction } from "../../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import { TransactionStatus } from "../../../domain/types/transaction.type";

const dbTransaction: Transaction[] = [
	{
		id: "28aeb886-79e0-4f7d-af79-28883559bfb9",
		from_account_number: 30126965,
		to_account_number: 66807289,
		amount: 150,
		description: "Transfer from account 1 to account 2",
		transaction_status: TransactionStatus.DONE,
		id_transition_reversal: null,
		created_at: new Date("2025-04-13T12:15:58.815Z"),
	},
	{
		id: "ad514249-a8cd-4af7-86a5-f0fe97eff160",
		from_account_number: 30126965,
		to_account_number: 66807289,
		amount: 150,
		description: "Transfer from account 1 to account 2",
		transaction_status: TransactionStatus.DONE,
		id_transition_reversal: null,
		created_at: new Date("2025-04-13T12:16:19.928Z"),
	},
];

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
