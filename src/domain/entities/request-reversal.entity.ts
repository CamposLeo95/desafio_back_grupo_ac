import type { RequestReversalStatus } from "../types/request-reversal.type";

export class RequestReversal {
	constructor(
		readonly id: string,
		public from_account_number: number,
		public to_account_number: number,
		public transaction_id: string,
		public description: string,
		public amount: number,
		public request_reversal_status: RequestReversalStatus,
	) {}
}
