import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../../../domain/entities/transaction.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import { TransactionStatus } from "../../../domain/types/transaction.type";
import { AppError } from "../../../shared/exceptions/app-error";
import type { CreditAccountUseCase } from "../account/credit.usecase";
import type { DebitAccountUseCase } from "../account/debit.usecase";

export class CreateTransactionUseCase {
	constructor(
		private readonly transactionRepository: ITransactionRepository,
		private accountRepository: IAccountRepository,
		private creditAccountUseCase: CreditAccountUseCase,
		private debitAccountUseCase: DebitAccountUseCase,
	) {}

	async execute(transaction: Input): Promise<Output> {
		const fromAccount = await this.accountRepository.findByAccountNumber(
			transaction.from_account_number,
		);

		if (!fromAccount) {
			throw new AppError(
				`A conta, ${transaction.from_account_number}, não foi encontrada`,
				404,
			);
		}

		const toAccount = await this.accountRepository.findByAccountNumber(
			transaction.to_account_number,
		);
		if (!toAccount) {
			throw new AppError(
				`A conta, ${transaction.to_account_number}, não foi encontrada`,
				404,
			);
		}

		if (transaction.amount <= 0) {
			throw new AppError("O valor da transferência deve ser maior que 0", 400);
		}

		await this.debitAccountUseCase.execute({
			account_number: fromAccount.account_number,
			amount: transaction.amount,
		});

		await this.creditAccountUseCase.execute({
			account_number: toAccount.account_number,
			amount: transaction.amount,
		});

		const newTransaction = new Transaction(
			uuidv4(),
			fromAccount.account_number,
			toAccount.account_number,
			transaction.amount,
			transaction.description,
			TransactionStatus.DONE,
			null,
			new Date(),
		);

		await this.transactionRepository.save(newTransaction);

		return {
			data: {
				...newTransaction,
			},
		};
	}
}

type Input = {
	amount: number;
	from_account_number: number;
	to_account_number: number;
	description: string;
};

type Output = {
	data: {
		id: string;
		from_account_number: number;
		to_account_number: number;
		amount: number;
		description: string;
		created_at: Date;
	};
};
