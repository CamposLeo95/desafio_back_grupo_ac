import type { Account } from "../../../domain/entities/account.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import { AppError } from "../../../shared/exceptions/app-error";

export class FindAllAccountUseCase {
	constructor(private readonly accountRepository: IAccountRepository) {}

	async execute(): Promise<Account[]> {
		const accounts = await this.accountRepository.findAll();

		if (!accounts) throw new AppError("Conta não encontrada!", 404);

		return accounts;
	}
}
