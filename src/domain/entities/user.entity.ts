export class User {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly cpf: string,
		readonly email: string,
		readonly password: string,
		readonly admin: boolean,
		readonly created_at: Date,
	) {}
}
