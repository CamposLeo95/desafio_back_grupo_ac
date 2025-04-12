import { v4 as uuidv4 } from "uuid";
import { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/app-error";
import { BcryptPasswordHash } from "../../services/password-hash/bcrypt-password-hash";
import type { CreateAccountUseCase } from "../account/create.usecase";

export class CreateUserUseCase {
	constructor(
		private userRepository: IUserRepository,
		private createAccountUseCase: CreateAccountUseCase,
	) {}

	async execute(user: Input): Promise<Output> {
		const userExists = await this.userRepository.findByEmail(user.email);
		const userExistsByCpf = await this.userRepository.findByCpf(user.cpf);

		if (userExistsByCpf) throw new AppError("CPF already registered", 409);
		if (userExists) throw new AppError("Email already registered", 409);

		const bcryptService = new BcryptPasswordHash(10);
		const passwordHash = await bcryptService.hash(user.password);

		const newUser = new User(
			uuidv4(),
			user.name,
			user.cpf,
			user.email,
			passwordHash,
			user.admin,
			new Date(),
		);
		await this.userRepository.save(newUser);

		const newAccount = await this.createAccountUseCase.execute({
			id_user: newUser.id,
		});

		return {
			data: {
				id: newUser.id,
				name: newUser.name,
				cpf: newUser.cpf,
				email: newUser.email,
				created_at: newUser.created_at,
				Account: {
					id: newAccount.data.id,
					balance: newAccount.data.balance,
					account_number: newAccount.data.account_number,
					created_at: newAccount.data.created_at,
				},
			},
		};
	}
}

type Input = {
	name: string;
	cpf: string;
	email: string;
	password: string;
	admin: boolean;
};

type Output = {
	data: {
		id: string;
		name: string;
		cpf: string;
		email: string;
		created_at: Date;
		Account: {
			id: string;
			balance: number;
			account_number: number;
			created_at: Date;
		};
	};
};
