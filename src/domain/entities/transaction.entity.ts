import type { TransactionStatus } from "../types/transaction.type";

export class Transaction {
	constructor(
		public id: string,
		public from_account_id: string,
		public to_account_id: string,
		public amount: number,
		public description: string,
		public status: TransactionStatus,
		public created_at: Date,
	) {}
}
