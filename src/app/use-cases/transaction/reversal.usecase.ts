import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import { TransactionStatus } from "../../../domain/types/transaction.type";
import { AppError } from "../../../shared/exceptions/app-error";

export class ReversalTransactionUseCase {
	constructor(private readonly transactionRepository: ITransactionRepository) {}

	async execute(id: string): Promise<Output> {
		const transactionExists = await this.transactionRepository.findById(id);

		if (!transactionExists) {
			throw new AppError("Transaction not found", 404);
		}

		if (transactionExists.transaction_status === TransactionStatus.REVERSAL) {
			throw new AppError("Transaction already reversed", 400);
		}

		const allTransactions =
			await this.transactionRepository.findAllTransactionsByAccountNumber(
				transactionExists.from_account_number,
			);

		const hasTransactionReversal = allTransactions
			.filter((transaction) => {
				console.log(transaction, "transaction Filter");
				return transaction.transaction_status === TransactionStatus.REVERSAL;
			})
			.some((transaction) => {
				console.log(transaction, "transaction some");
				return transaction.id_transition_reversal === transactionExists.id;
			});

		if (hasTransactionReversal) {
			throw new AppError("Transaction already reversed", 400);
		}

		const newTransaction = new Transaction(
			uuidv4(),
			transactionExists.to_account_number,
			transactionExists.from_account_number,
			transactionExists.amount,
			`Reversal of transaction ${transactionExists.id}`,
			TransactionStatus.REVERSAL,
			transactionExists.id,
			new Date(),
		);

		await this.transactionRepository.save(newTransaction);

		return {
			data: newTransaction,
		};
	}
}

type Output = {
	data: {
		id: string;
		from_account_number: number;
		to_account_number: number;
		amount: number;
		description: string;
		transaction_status: TransactionStatus;
		id_transition_reversal: string | null;
		created_at: Date;
	};
};
