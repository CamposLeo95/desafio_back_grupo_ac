import { prisma } from "../config/prisma-client";

import type { RequestReversal } from "../../../domain/entities/request-reversal.entity";
import type { IRequestReversalRepository } from "../../../domain/repositories/request-reversal.repository";
import type { RequestReversalStatus } from "../../../domain/types/request-reversal.type";

export class PrismaRepoRequestReversal implements IRequestReversalRepository {
	async save(requestReversal: RequestReversal): Promise<void> {
		await prisma.request_reversals.create({
			data: {
				id: requestReversal.id,
				from_account_number: requestReversal.from_account_number,
				to_account_number: requestReversal.to_account_number,
				transaction_id: requestReversal.transaction_id,
				description: requestReversal.description,
				amount: requestReversal.amount,
				request_reversal_status: requestReversal.request_reversal_status,
			},
		});
	}

	async findById(id: string): Promise<RequestReversal | null> {
		const result = await prisma.request_reversals.findUnique({
			where: { id },
		});

		if (result) {
			return {
				...result,
				amount: result.amount.toNumber(),
				request_reversal_status:
					result.request_reversal_status as RequestReversalStatus,
			};
		}

		return null;
	}

	async update(requestReversal: RequestReversal): Promise<void> {
		await prisma.request_reversals.update({
			where: { id: requestReversal.id },
			data: {
				from_account_number: requestReversal.from_account_number,
				to_account_number: requestReversal.to_account_number,
				transaction_id: requestReversal.transaction_id,
				description: requestReversal.description,
				amount: requestReversal.amount,
				request_reversal_status: requestReversal.request_reversal_status,
			},
		});
	}

	async findAll(): Promise<RequestReversal[]> {
		const results = await prisma.request_reversals.findMany();
		return results.map((result) => ({
			...result,
			amount: result.amount.toNumber(),
			request_reversal_status:
				result.request_reversal_status as RequestReversalStatus,
		}));
	}
}
