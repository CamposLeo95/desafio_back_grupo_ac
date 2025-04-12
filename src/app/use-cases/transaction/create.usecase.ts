import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../../../domain/entities/transaction.entity";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import { TransactionStatus } from "../../../domain/types/transaction.type";

export class CreateTransactionUseCase {
	constructor(private readonly transactionRepository: ITransactionRepository) {}

	async execute(transaction: Input): Promise<Output> {
		const newTransaction = new Transaction(
			uuidv4(),
			transaction.from_account_id,
			transaction.to_account_id,
			transaction.amount,
			transaction.description,
			TransactionStatus.PENDING,
			new Date(),
		);

		await this.transactionRepository.save(newTransaction);

		return {
			data: {
				...newTransaction,
			},
		};
	}
}

type Input = {
	amount: number;
	from_account_id: string;
	to_account_id: string;
	description: string;
};

type Output = {
	data: {
		id: string;
		from_account_id: string;
		to_account_id: string;
		amount: number;
		description: string;
		status: TransactionStatus;
		created_at: Date;
	};
};
