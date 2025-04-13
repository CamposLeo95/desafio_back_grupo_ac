import type { RequestReversal } from "../entities/request-reversal.entity";

export interface IRequestReversalRepository {
	save(requestReversal: RequestReversal): Promise<void>;
	findById(id: string): Promise<RequestReversal | null>;
	findAll(): Promise<RequestReversal[]>;
	update(requestReversal: RequestReversal): Promise<void>;
}
