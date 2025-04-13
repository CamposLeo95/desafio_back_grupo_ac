import { RequestReversal } from "../../../domain/entities/request-reversal.entity";
import type { IRequestReversalRepository } from "../../../domain/repositories/request-reversal.repository";
import { RequestReversalStatus } from "../../../domain/types/request-reversal.type";
import { AppError } from "../../../shared/exceptions/app-error";

export class ApprovedRequestReversalUseCase {
	constructor(private requestReversalRepository: IRequestReversalRepository) {}

	async execute(requestReversalId: string): Promise<void> {
		const requestReversal =
			await this.requestReversalRepository.findById(requestReversalId);
		if (!requestReversal) {
			throw new AppError("Requisição não encontrada!", 404);
		}

		if (
			requestReversal.request_reversal_status === RequestReversalStatus.APPROVED
		) {
			throw new AppError("Requisição já aprovada!", 400);
		}

		if (
			requestReversal.request_reversal_status === RequestReversalStatus.REJECTED
		) {
			throw new AppError(
				"Requisição já reprovada! Não é possível aprová-la.",
				400,
			);
		}

		const newRequestReversal = new RequestReversal(
			requestReversal.id,
			requestReversal.from_account_number,
			requestReversal.to_account_number,
			requestReversal.transaction_id,
			requestReversal.description,
			requestReversal.amount,
			RequestReversalStatus.APPROVED,
		);

		await this.requestReversalRepository.update(newRequestReversal);
	}
}
