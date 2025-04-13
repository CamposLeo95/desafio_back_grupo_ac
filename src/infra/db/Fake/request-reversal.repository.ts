import type { RequestReversal } from "../../../domain/entities/request-reversal.entity";
import type { IRequestReversalRepository } from "../../../domain/repositories/request-reversal.repository";
import { RequestReversalStatus } from "../../../domain/types/request-reversal.type";

const dbRequestReversal: RequestReversal[] = [
	{
		id: "42fcb3c7-86eb-4870-9348-079d726dae6e",
		from_account_number: 30126965,
		to_account_number: 66807289,
		transaction_id: "28aeb886-79e0-4f7d-af79-28883559bfb9",
		description: "Envio para a conta errada, favor estornar",
		amount: 150,
		request_reversal_status: RequestReversalStatus.REQUESTED,
	},
];

export class FakeRepoRequestReversal implements IRequestReversalRepository {
	async save(requestReversal: RequestReversal): Promise<void> {
		dbRequestReversal.push(requestReversal);
	}

	async findById(id: string): Promise<RequestReversal | null> {
		const requestReversal = dbRequestReversal.find(
			(request) => request.id === id,
		);
		return requestReversal || null;
	}

	async update(requestReversal: RequestReversal): Promise<void> {
		const index = dbRequestReversal.findIndex(
			(request) => request.id === requestReversal.id,
		);
		if (index !== -1) {
			dbRequestReversal[index] = requestReversal;
		}
	}

	async findAll(): Promise<RequestReversal[]> {
		return dbRequestReversal;
	}
}
