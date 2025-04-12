import { v4 as uuidv4 } from "uuid";
import { Account } from "../../../domain/entities/account.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import { generateAccountNumber } from "../../../shared/utils/generateAccountNumber";

export class CreateAccountUseCase {
	constructor(readonly accountRepository: IAccountRepository) {}

	async execute(account: Input): Promise<Output> {
		const newAccount = new Account(
			uuidv4(),
			account.id_user,
			0,
			generateAccountNumber(),
			new Date(),
		);
		await this.accountRepository.save(newAccount);
		return {
			data: {
				id: newAccount.id,
				balance: newAccount.balance,
				account_number: newAccount.account_number,
				created_at: newAccount.created_at,
			},
		};
	}
}

type Input = {
	id_user: string;
};

type Output = {
	data: {
		id: string;
		balance: number;
		account_number: number;
		created_at: Date;
	};
};
