import type { Transaction } from "../../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import type { TransactionStatus } from "../../../domain/types/transaction.type";
import { prisma } from "../config/prisma-client";

export class PrismaRepoTransaction implements ITransactionRepository {
	async findById(id: string): Promise<Transaction | null> {
		const transaction = await prisma.transactions.findUnique({
			where: { id },
		});
		if (transaction) {
			return {
				...transaction,
				amount: transaction.amount.toNumber(),
				transaction_status: transaction.transaction_status as TransactionStatus,
			};
		}
		return null;
	}

	async save(transaction: Transaction): Promise<void> {
		await prisma.transactions.create({
			data: {
				id: transaction.id,
				from_account_number: transaction.from_account_number,
				to_account_number: transaction.to_account_number,
				amount: transaction.amount,
				description: transaction.description,
				transaction_status: transaction.transaction_status,
				id_transition_reversal: transaction.id_transition_reversal,
				created_at: transaction.created_at,
			},
		});
	}

	async findAllTransactionsByAccountNumber(
		account_number: number,
	): Promise<Transaction[]> {
		const transactions = await prisma.transactions.findMany({
			where: {
				OR: [
					{ from_account_number: account_number },
					{ to_account_number: account_number },
				],
			},
		});
		return transactions.map((transaction) => ({
			...transaction,
			amount: transaction.amount.toNumber(),
			transaction_status: transaction.transaction_status as TransactionStatus,
		}));
	}
}
