import type { Account } from "../entities/account.entity";

export interface IAccountRepository {
	save(account: Account): Promise<void>;
	credit(account_number: number, amount: number): Promise<void>;
	debit(account_number: number, amount: number): Promise<void>;
	findById(id: string): Promise<Account | null>;
	findByUserId(id_user: string): Promise<Account | null>;
	findByAccountNumber(account_number: number): Promise<Account | null>;
	findAll(): Promise<Account[]>;
}
