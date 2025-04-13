import bcrypt from "bcryptjs";
import type { User } from "../../../domain/entities/user.entity";
import { AppError } from "../../../shared/exceptions/app-error";
export class BcryptPasswordHash {
	constructor(private readonly salt: number) {}

	async hash(password: string): Promise<string> {
		return await bcrypt.hash(password, this.salt);
	}

	async compare(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}

	async verifyUser(userReq: userReq, userDB: User): Promise<void> {
		const compared = await this.compare(userReq.password, userDB.password);

		if (!compared) {
			throw new AppError("Usuário ou senha invalidos!", 401);
		}
	}
}

type userReq = {
	email: string;
	password: string;
};
