import { v4 as uuidv4 } from "uuid";
import { RequestReversal } from "../../../domain/entities/request-reversal.entity";
import type { IRequestReversalRepository } from "../../../domain/repositories/request-reversal.repository";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import { RequestReversalStatus } from "../../../domain/types/request-reversal.type";
import { AppError } from "../../../shared/exceptions/app-error";

export class RequestReversalUseCase {
	constructor(
		private requestReversalRepository: IRequestReversalRepository,
		private readonly transactionRepository: ITransactionRepository,
	) {}

	async execute(
		idTransaction: string,
		description: string,
	): Promise<RequestReversal> {
		const transaction =
			await this.transactionRepository.findById(idTransaction);

		if (!transaction) {
			throw new AppError(
				`A transação ${idTransaction} não foi encontrada`,
				404,
			);
		}

		const newRequestReversal = new RequestReversal(
			uuidv4(),
			transaction.from_account_number,
			transaction.to_account_number,
			transaction.id,
			description,
			transaction.amount,
			RequestReversalStatus.REQUESTED,
		);

		await this.requestReversalRepository.save(newRequestReversal);

		return newRequestReversal;
	}
}
