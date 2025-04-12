import type { Account } from "../../../domain/entities/account.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
const dbAccount: Account[] = [];

export class RepoAccountTeste implements IAccountRepository {
	async findAll(): Promise<Account[]> {
		return dbAccount;
	}
	async save(account: Account): Promise<void> {
		dbAccount.push(account);
	}

	async findById(id: string): Promise<Account | null> {
		const account = dbAccount.find((account) => account.id === id);
		return account || null;
	}

	async findByUserId(id_user: string): Promise<Account | null> {
		const account = dbAccount.find((account) => account.id_user === id_user);
		return account || null;
	}

	async findByAccountNumber(account_number: number): Promise<Account | null> {
		const account = dbAccount.find(
			(account) => account.account_number === account_number,
		);
		return account || null;
	}

	async credit(id: string, amount: number): Promise<void> {
		const account = await this.findById(id);
		if (account) account.balance += amount;
	}

	async debit(id: string, amount: number): Promise<void> {
		const account = await this.findById(id);
		if (account) {
			account.balance -= amount;
		}
	}
}
