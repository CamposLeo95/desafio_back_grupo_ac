import type { RequestReversal } from "../../../domain/entities/request-reversal.entity";
import type { IRequestReversalRepository } from "../../../domain/repositories/request-reversal.repository";
import { isUserAdmin } from "../../../shared/utils/is-admin";

export class FindAllRequestReversalUseCase {
	constructor(private requestReversalRepository: IRequestReversalRepository) {}

	async execute(token: string): Promise<RequestReversal[]> {
		isUserAdmin(token);

		const requestReversals = await this.requestReversalRepository.findAll();
		if (!requestReversals) {
			throw new Error("Nenhuma requisição encontrada!");
		}

		return requestReversals;
	}
}
