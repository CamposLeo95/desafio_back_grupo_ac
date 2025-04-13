import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import { AppError } from "../../../shared/exceptions/app-error";

export class DebitAccountUseCase {
	constructor(readonly accountRepository: IAccountRepository) {}

	async execute(account: Input): Promise<Output> {
		const accountExists = await this.accountRepository.findByAccountNumber(
			account.account_number,
		);

		if (!accountExists) {
			throw new AppError("Conta não encontrada!", 404);
		}

		if (accountExists.balance < account.amount || accountExists.balance === 0) {
			throw new AppError("Saldo insulficiente!", 400);
		}

		await this.accountRepository.debit(account.account_number, account.amount);

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
	account_number: number;
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
