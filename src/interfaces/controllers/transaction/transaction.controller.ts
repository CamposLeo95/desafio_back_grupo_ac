import type { Request, Response } from "express";
import type { CreateTransactionUseCase } from "../../../app/use-cases/transaction/create.usecase";
import { AppError } from "../../../shared/exceptions/app-error";

export class TransactionController {
	constructor(private readonly transactionUseCase: CreateTransactionUseCase) {}

	async createTransaction(req: Request, res: Response) {
		const { amount, from_account_id, to_account_id, description } = req.body;

		try {
			const transaction = await this.transactionUseCase.execute({
				amount,
				from_account_id,
				to_account_id,
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
}
