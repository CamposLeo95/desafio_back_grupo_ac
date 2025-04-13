import type { Account } from "../../../domain/entities/account.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import { AppError } from "../../../shared/exceptions/app-error";

export class FindByIdAccountUseCase {
	constructor(private readonly accountRepository: IAccountRepository) {}

	async execute(id: string): Promise<Account> {
		const account = await this.accountRepository.findById(id);

		if (!account) throw new AppError("Conta não encontrada!", 404);

		return account;
	}
}
