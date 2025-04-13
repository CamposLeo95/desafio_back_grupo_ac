import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";

export class FindAllSendTransactionByAccountUseCase {
	constructor(private readonly transactionRepository: ITransactionRepository) {}

	async execute(account_number: number) {
		const transactions =
			await this.transactionRepository.findAllTransactionsByAccountNumber(
				account_number,
			);
		return transactions;
	}
}
