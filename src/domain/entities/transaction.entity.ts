import type { TransactionStatus } from "../types/transaction.type";

export class Transaction {
	constructor(
		public id: string,
		public from_account_number: number,
		public to_account_number: number,
		public amount: number,
		public description: string,
		public transaction_status: TransactionStatus,
		public id_transition_reversal: string | null,
		public created_at: Date,
	) {}
}
