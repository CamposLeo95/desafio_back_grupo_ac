import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import { AppError } from "../../../shared/exceptions/app-error";

export class CreditAccountUseCase {
	constructor(readonly accountRepository: IAccountRepository) {}

	async execute(account: Input): Promise<Output> {
		const accountExists = await this.accountRepository.findById(account.id);

		if (!accountExists) throw new AppError("Account not found", 404);

		await this.accountRepository.credit(account.id, account.amount);

		return {
			data: {
				id: accountExists.id,
				balance: accountExists.balance,
				account_number: accountExists.account_number,
				created_at: accountExists.created_at,
			},
		};
	}
}

type Input = {
	id: string;
	amount: number;
};

type Output = {
	data: {
		id: string;
		balance: number;
		account_number: number;
		created_at: Date;
	};
};
