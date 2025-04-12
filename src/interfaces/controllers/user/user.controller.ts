import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../../../app/use-cases/user/create.usecase";
import type { FindAllUsersUseCase } from "../../../app/use-cases/user/find-all.usecase";

export class UserController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private findAllUsersUseCase: FindAllUsersUseCase,
	) {}

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
			res.status(201).json(result);
		} catch (error: unknown) {
			res.status(400).json({ error: error });
		}
	}

	async findAllUsers(_req: Request, res: Response) {
		try {
			console.log("findAllUsers", this.findAllUsersUseCase);
			const result = await this.findAllUsersUseCase.execute();
			console.log(result);
			res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);

				res.status(401).json({ message: error.message });
			}

			res.status(500).json({ error: "Internal server error" });
		}
	}
}
