import type { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";

export class FindAllUsersUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(): Promise<Output> {
		const users = await this.userRepository.findAll();
		const finalUsers = users.map(this.outPutMapper);
		return {
			data: finalUsers,
		};
	}

	outPutMapper(user: User) {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}
}

type Output = {
	data: Omit<User, "password">[];
};
