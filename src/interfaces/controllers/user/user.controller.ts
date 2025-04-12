import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../../../app/use-cases/user/create.usecase";

export class UserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async createUser(req: Request, res: Response) {
		const { name, cpf, email, password, admin } = req.body;
		const userDTO = {
			name,
			cpf,
			email,
			password,
			admin,
		};

		try {
			const result = await this.createUserUseCase.execute(userDTO);
			return res.status(201).json(result);
		} catch (error: unknown) {
			return res.status(400).json({ error: error });
		}
	}
}
