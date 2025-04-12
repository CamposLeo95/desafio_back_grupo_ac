export class Account {
	constructor(
		readonly id: string,
		readonly id_user: string,
		readonly balance: number,
		readonly account_number: number,
		readonly created_at: Date,
	) {}
}
