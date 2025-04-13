import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../../../domain/entities/transaction.entity";
import type { IAccountRepository } from "../../../domain/repositories/account.repository";
import type { ITransactionRepository } from "../../../domain/repositories/transaction.repository";
import { TransactionStatus } from "../../../domain/types/transaction.type";
import { AppError } from "../../../shared/exceptions/app-error";
import type { CreditAccountUseCase } from "../account/credit.usecase";
import type { DebitAccountUseCase } from "../account/debit.usecase";

export class ReversalTransactionUseCase {
	constructor(
		private readonly transactionRepository: ITransactionRepository,
		private readonly accountRepository: IAccountRepository,
		private creditAccountUseCase: CreditAccountUseCase,
		private debitAccountUseCase: DebitAccountUseCase,
	) {}

	async execute(id: string): Promise<Output> {
		const transactionExists = await this.transactionRepository.findById(id);

		if (!transactionExists) {
			throw new AppError("Transação não encontrada", 404);
		}

		if (transactionExists.transaction_status === TransactionStatus.REVERSAL) {
			throw new AppError("Não é permitido transacionar um estorno", 400);
		}

		const accountDebit = await this.accountRepository.findByAccountNumber(
			transactionExists.to_account_number,
		);

		if (!accountDebit) {
			throw new AppError(
				`Conta ${transactionExists.to_account_number} não encontrada!`,
				404,
			);
		}

		if (
			accountDebit.balance < transactionExists.amount ||
			accountDebit.balance === 0
		) {
			throw new AppError(
				`Saldo da conta ${transactionExists.to_account_number} é insuficiente!`,
				400,
			);
		}

		const allTransactions =
			await this.transactionRepository.findAllTransactionsByAccountNumber(
				transactionExists.from_account_number,
			);

		const hasTransactionReversal = allTransactions
			.filter((transaction) => {
				return transaction.transaction_status === TransactionStatus.REVERSAL;
			})
			.some((transaction) => {
				return transaction.id_transition_reversal === transactionExists.id;
			});

		if (hasTransactionReversal) {
			throw new AppError("Esta transação já foi realizada!", 400);
		}

		const newTransaction = new Transaction(
			uuidv4(),
			transactionExists.to_account_number,
			transactionExists.from_account_number,
			transactionExists.amount,
			`Estorno da transação:  ${transactionExists.id}`,
			TransactionStatus.REVERSAL,
			transactionExists.id,
			new Date(),
		);

		await this.debitAccountUseCase.execute({
			account_number: transactionExists.to_account_number,
			amount: transactionExists.amount,
		});

		await this.creditAccountUseCase.execute({
			account_number: transactionExists.from_account_number,
			amount: transactionExists.amount,
		});

		await this.transactionRepository.save(newTransaction);

		return {
			data: newTransaction,
		};
	}
}

type Output = {
	data: {
		id: string;
		from_account_number: number;
		to_account_number: number;
		amount: number;
		description: string;
		transaction_status: TransactionStatus;
		id_transition_reversal: string | null;
		created_at: Date;
	};
};
