import type { Request, Response } from "express";
import type { LoginUseCase } from "../../../app/use-cases/auth/login.usecase";
import { AppError } from "../../../shared/exceptions/app-error";

export class LoginController {
	constructor(private loginUseCase: LoginUseCase) {}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;

			const user = await this.loginUseCase.execute(email, password);
			res.status(200).json(user);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ message: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}
}
