export class Account {
	constructor(
		readonly id: string,
		readonly id_user: string,
		public balance: number,
		readonly account_number: number,
		readonly created_at: Date,
	) {}
}
