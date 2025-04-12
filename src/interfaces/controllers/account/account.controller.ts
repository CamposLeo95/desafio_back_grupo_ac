import type { Request, Response } from "express";
import type { CreditAccountUseCase } from "../../../app/use-cases/account/credit.usecase";
import type { FindByIdAccountUseCase } from "../../../app/use-cases/account/find-by-id.usecase";
import { AppError } from "../../../shared/exceptions/app-error";

export class AccountController {
	constructor(
		private creditAccountUseCase: CreditAccountUseCase,
		private findByIdAccountUseCase: FindByIdAccountUseCase,
	) {}

	async credit(req: Request, res: Response): Promise<void> {
		try {
			const { id, amount } = req.body;
			await this.creditAccountUseCase.execute({ id, amount });
			res.status(200).json({ message: "Account credited successfully" });
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });
			}
			res.status(500).json({ error: "Internal server error" });
		}
	}

	async findById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const account = await this.findByIdAccountUseCase.execute(id);
			res.status(200).json(account);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });
			}
			res.status(500).json({ error: "Internal server error" });
		}
	}
}
