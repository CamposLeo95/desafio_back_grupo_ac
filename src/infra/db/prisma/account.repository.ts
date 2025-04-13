import type { Account } from "../../../domain/entities/account.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
const dbAccount: Account[] = [
	{
		id: "0df49dbb-af2c-4e52-8498-83e80f88b090",
		id_user: "5e582b27-eef1-4a4e-bcf2-263c6a99b8aa",
		balance: 1000,
		account_number: 30126965,
		created_at: new Date("2025-04-13T12:12:18.075Z"),
	},
	{
		id: "e7a6b3b3-e4f4-42fc-a294-b1f882cfacbd",
		id_user: "b0e4c233-91a4-47a6-bcb5-901d80dcec8b",
		balance: 1000,
		account_number: 66807289,
		created_at: new Date("2025-04-13T12:12:18.075Z"),
	},
];

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

	async credit(account_number: number, amount: number): Promise<void> {
		const account = await this.findByAccountNumber(account_number);
		if (account) account.balance += amount;
	}

	async debit(account_number: number, amount: number): Promise<void> {
		const account = await this.findByAccountNumber(account_number);
		if (account) {
			account.balance -= amount;
		}
	}
}
