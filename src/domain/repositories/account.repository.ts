import type { Account } from "../entities/account.entity";

export interface IAccountRepository {
	save(account: Account): Promise<void>;
	findAll(): Promise<Account[]>;
}
