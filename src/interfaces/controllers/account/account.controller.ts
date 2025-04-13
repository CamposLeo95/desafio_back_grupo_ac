import type { Request, Response } from "express";
import type { CreditAccountUseCase } from "../../../app/use-cases/account/credit.usecase";
import type { FindAllAccountUseCase } from "../../../app/use-cases/account/find-all.usecase";
import type { FindByIdAccountUseCase } from "../../../app/use-cases/account/find-by-id.usecase";
import { AppError } from "../../../shared/exceptions/app-error";

export class AccountController {
	constructor(
		private creditAccountUseCase: CreditAccountUseCase,
		private findByIdAccountUseCase: FindByIdAccountUseCase,
		private findAllAccountUseCase: FindAllAccountUseCase,
	) {}

	async credit(req: Request, res: Response): Promise<void> {
		try {
			const { account_number, amount } = req.body;
			await this.creditAccountUseCase.execute({ account_number, amount });
			res
				.status(200)
				.json({
					message: `Valor ${amount} creditado na conta ${account_number} `,
				});
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
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
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}

	async findAll(_req: Request, res: Response): Promise<void> {
		try {
			const accounts = await this.findAllAccountUseCase.execute();
			res.status(200).json(accounts);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}
}
