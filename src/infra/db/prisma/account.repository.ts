import type { Account } from "../../../domain/entities/account.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import { prisma } from "../config/prisma-client";

export class PrismaRepoAccount implements IAccountRepository {
	async findAll(): Promise<Account[]> {
		return prisma.accounts.findMany().then((accounts) =>
			accounts.map((account) => ({
				...account,
				balance: Number(account.balance),
			})),
		);
	}

	async save(account: Account): Promise<void> {
		await prisma.accounts.create({
			data: {
				id: account.id,
				id_user: account.id_user,
				balance: account.balance,
				account_number: account.account_number,
				created_at: account.created_at,
			},
		});
	}

	async findById(id: string): Promise<Account | null> {
		const account = await prisma.accounts.findUnique({ where: { id } });
		return account ? { ...account, balance: Number(account.balance) } : null;
	}

	async findByUserId(id_user: string): Promise<Account | null> {
		const account = await prisma.accounts.findFirst({ where: { id_user } });
		return account ? { ...account, balance: Number(account.balance) } : null;
	}

	async findByAccountNumber(account_number: number): Promise<Account | null> {
		const account = await prisma.accounts.findUnique({
			where: { account_number },
		});
		return account ? { ...account, balance: Number(account.balance) } : null;
	}

	async credit(account_number: number, amount: number): Promise<void> {
		await prisma.accounts.update({
			where: { account_number },
			data: { balance: { increment: amount } },
		});
	}

	async debit(account_number: number, amount: number): Promise<void> {
		await prisma.accounts.update({
			where: { account_number },
			data: { balance: { decrement: amount } },
		});
	}
}
