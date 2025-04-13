import type { IUserRepository } from "../../../domain/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/app-error";
import { generateToken } from "../../services/jwt/generate-token";
import type { BcryptPasswordHash } from "../../services/password-hash/bcrypt-password-hash";

export class LoginUseCase {
	constructor(
		private userRepository: IUserRepository,
		private bcryptPasswordHash: BcryptPasswordHash,
	) {}

	async execute(email: string, password: string) {
		const userReq = { email, password };
		const userDB = await this.userRepository.findByEmail(email);

		if (!userDB) {
			throw new AppError("Usuário ou senha invalidos! 1", 404);
		}

		await this.bcryptPasswordHash.verifyUser(userReq, userDB);

		const token = await generateToken(userDB.id, userDB.email);

		console.log(token);

		const user = {
			id: userDB.id,
			name: userDB.name,
			email: userDB.email,
			cpf: userDB.cpf,
			token,
		};

		return user;
	}
}
