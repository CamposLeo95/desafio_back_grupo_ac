import type { Request, Response } from "express";
import type { CreateTransactionUseCase } from "../../../app/use-cases/transaction/create.usecase";
import type { FindAllSendTransactionByAccountUseCase } from "../../../app/use-cases/transaction/find-all-by-account.usecase";
import type { ReversalTransactionUseCase } from "../../../app/use-cases/transaction/reversal.usecase";
import { AppError } from "../../../shared/exceptions/app-error";

export class TransactionController {
	constructor(
		private readonly createtransactionUseCase: CreateTransactionUseCase,
		private readonly ReversalTransactionUseCase: ReversalTransactionUseCase,
		private readonly findAllSendTransactionByAccountUseCase: FindAllSendTransactionByAccountUseCase,
	) {}

	async createTransaction(req: Request, res: Response) {
		const { amount, from_account_number, to_account_number, description } =
			req.body;

		try {
			const transaction = await this.createtransactionUseCase.execute({
				amount,
				from_account_number,
				to_account_number,
				description,
			});

			res.status(201).json(transaction);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "internal server error!" });
		}
	}

	async reversalTransaction(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const transaction = await this.ReversalTransactionUseCase.execute(id);
			res.status(200).json(transaction);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "internal server error!" });
		}
	}

	async findAllSendByAccount(req: Request, res: Response) {
		const { account_number } = req.params;

		try {
			const transactions =
				await this.findAllSendTransactionByAccountUseCase.execute(
					+account_number,
				);
			res.status(200).json(transactions);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "internal server error!" });
		}
	}
}
